import { generateRssFeed } from '@/lib/rss';

export const dynamic = 'force-static';

export const GET = () => {
  const feed = generateRssFeed();
  
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};

