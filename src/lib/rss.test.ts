import { describe, expect, it } from 'vitest';
import { generateRssFeed } from './rss';
import type { BlogPostMeta } from './types';

const post: BlogPostMeta = {
  slug: 'hello-world',
  title: 'Hello, World!',
  description: 'A post with <angle> & ampersands',
  date: '2025-06-01',
  tags: ['Web', 'Dev'],
  readingTime: '2 min read',
};

describe('generateRssFeed', () => {
  it('wraps posts in an rss channel', () => {
    const feed = generateRssFeed([post]);

    expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain('<title>undefined-art</title>');
  });

  it('builds a correct item URL and guid', () => {
    const feed = generateRssFeed([post]);

    expect(feed).toContain('<link>https://undefined-art.github.io/articles/hello-world/</link>');
    expect(feed).toContain(
      '<guid isPermaLink="true">https://undefined-art.github.io/articles/hello-world/</guid>'
    );
  });

  it('escapes XML-sensitive characters in titles, descriptions and tags', () => {
    const feed = generateRssFeed([post]);

    expect(feed).toContain('<![CDATA[A post with &lt;angle&gt; &amp; ampersands]]>');
    expect(feed).not.toContain('<description><![CDATA[A post with <angle> & ampersands]]>');
    expect(feed).toContain('<category>Web</category>');
  });

  it('renders pubDate in RFC 822 format', () => {
    const feed = generateRssFeed([post]);

    expect(feed).toContain('<pubDate>Sun, 01 Jun 2025 00:00:00 GMT</pubDate>');
  });

  it('emits an empty item list for no posts', () => {
    const feed = generateRssFeed([]);

    expect(feed).toContain('<channel>');
    expect(feed).not.toContain('<item>');
  });
});
