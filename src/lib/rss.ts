import { getAllPosts } from './blog';

const SITE_URL = 'https://undefined-art.github.io';
const SITE_TITLE = 'undefined-art';
const SITE_DESCRIPTION = 'Thoughts, code, and creative experiments by undefined-art.';

export const generateRssFeed = (): string => {
  const posts = getAllPosts();
  
  const itemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/articles/${post.slug}/`;
      const pubDate = new Date(post.date).toUTCString();
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return rss;
};

