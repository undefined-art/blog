import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostMeta } from '../types';
import { parseFrontmatter } from './frontmatter';

const DEFAULT_POSTS_DIR = path.join(process.cwd(), 'content/articles');

/**
 * Module-level cache: every file in the content directory is read and
 * parsed exactly once per build. Previously every call to getAllPosts /
 * getPostBySlug / getAllTags re-read and re-parsed all files.
 */
let postsCache: BlogPost[] | null = null;

const readAllPosts = (dir: string): BlogPost[] => {
  if (postsCache) return postsCache;

  if (!fs.existsSync(dir)) {
    postsCache = [];
    return postsCache;
  }

  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
      const { data, content } = matter(fileContent);
      const frontmatter = parseFrontmatter(data, slug);

      return {
        slug,
        ...frontmatter,
        readingTime: readingTime(content).text,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  postsCache = posts;
  return posts;
};

const toMeta = ({ content: _content, ...meta }: BlogPost): BlogPostMeta => meta;

export const getAllPosts = (dir: string = DEFAULT_POSTS_DIR): BlogPostMeta[] =>
  readAllPosts(dir).map(toMeta);

export const getPostBySlug = (slug: string, dir: string = DEFAULT_POSTS_DIR): BlogPost | null =>
  readAllPosts(dir).find((post) => post.slug === slug) ?? null;

export const getAllTags = (dir: string = DEFAULT_POSTS_DIR): string[] =>
  Array.from(new Set(readAllPosts(dir).flatMap((post) => post.tags))).sort();

/** Test helper: invalidates the module-level cache between tests. */
export const clearPostsCache = (): void => {
  postsCache = null;
};
