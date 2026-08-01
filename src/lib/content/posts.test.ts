import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { clearPostsCache, getAllPosts, getAllTags, getPostBySlug } from './posts';

let fixtureDir: string;

const writePost = (slug: string, frontmatter: string, body = 'Some content here.') => {
  fs.writeFileSync(path.join(fixtureDir, `${slug}.mdx`), `---\n${frontmatter}\n---\n\n${body}`);
};

beforeEach(() => {
  fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-posts-test-'));
  clearPostsCache();
});

afterEach(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  clearPostsCache();
});

describe('posts repository', () => {
  it('returns an empty list for a missing directory', () => {
    expect(getAllPosts('/nonexistent/dir')).toEqual([]);
  });

  it('reads and sorts posts by date descending', () => {
    writePost('older', `title: "Older"\ndate: "2025-01-01"`);
    writePost('newer', `title: "Newer"\ndate: "2025-06-01"`);

    const posts = getAllPosts(fixtureDir);

    expect(posts.map((post) => post.slug)).toEqual(['newer', 'older']);
  });

  it('ignores non-mdx files', () => {
    fs.writeFileSync(path.join(fixtureDir, 'readme.txt'), 'not a post');
    writePost('real', `title: "Real"\ndate: "2025-01-01"`);

    expect(getAllPosts(fixtureDir)).toHaveLength(1);
  });

  it('computes reading time and strips content from metadata', () => {
    writePost('long', `title: "Long"\ndate: "2025-01-01"`, 'word '.repeat(300));

    const meta = getAllPosts(fixtureDir)[0];

    expect(meta.readingTime).toMatch(/\d+ min read/);
    expect('content' in meta).toBe(false);
  });

  it('returns the full post including content for getPostBySlug', () => {
    writePost('full', `title: "Full"\ndate: "2025-01-01"`, 'Body text.');

    const post = getPostBySlug('full', fixtureDir);

    expect(post?.title).toBe('Full');
    expect(post?.content).toContain('Body text.');
  });

  it('returns null for an unknown slug', () => {
    expect(getPostBySlug('missing', fixtureDir)).toBeNull();
  });

  it('collects and sorts unique tags', () => {
    writePost('a', `title: "A"\ndate: "2025-01-01"\ntags: ["Zeta", "Alpha"]`);
    writePost('b', `title: "B"\ndate: "2025-01-02"\ntags: ["Alpha"]`);

    expect(getAllTags(fixtureDir)).toEqual(['Alpha', 'Zeta']);
  });

  it('rejects invalid frontmatter loudly', () => {
    writePost('broken', `date: "not-a-date"`);

    expect(() => getAllPosts(fixtureDir)).toThrow(/broken\.mdx/);
  });

  it('caches: repeated calls do not re-read the directory', () => {
    writePost('a', `title: "A"\ndate: "2025-01-01"`);
    getAllPosts(fixtureDir);
    fs.writeFileSync(
      path.join(fixtureDir, 'a.mdx'),
      fs.readFileSync(path.join(fixtureDir, 'a.mdx'), 'utf-8').replace('A', 'Changed')
    );

    expect(getAllPosts(fixtureDir)[0].title).toBe('A');
  });
});
