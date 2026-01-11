import type { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { ArticlesList } from '@/components/ArticlesList';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles on web development, code, and creative experiments.',
};

const ArticlesPage = () => {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <section className="mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100 leading-tight animate-fade-in">
            Articles
          </h1>
          <p className="mt-4 text-lg text-ink-600 dark:text-parchment-400 animate-stagger-1">
            Thoughts on web development, code experiments, and the occasional creative exploration.
          </p>
        </div>
      </section>
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-ink-500 dark:text-ink-400 text-lg">
              No articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <ArticlesList posts={posts} allTags={allTags} />
        )}
      </section>
    </div>
  );
};

export default ArticlesPage;
