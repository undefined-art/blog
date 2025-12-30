import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles on web development, code, and creative experiments.',
};

const staggerClasses = [
  'animate-stagger-1',
  'animate-stagger-2',
  'animate-stagger-3',
  'animate-stagger-4',
  'animate-stagger-5',
  'animate-stagger-6',
];

const ArticlesPage = () => {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <section className="mb-16">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100 leading-tight animate-fade-in">
            Articles
          </h1>
          <p className="mt-4 text-lg text-ink-600 dark:text-parchment-400 max-w-2xl animate-stagger-1">
            Thoughts on web development, code experiments, and the occasional 
            creative exploration. Grab a coffee and stay awhile ☕
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4 animate-stagger-2" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
          <span className="text-accent-terracotta dark:text-accent-ochre text-2xl animate-float">
            ✦
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
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
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className={staggerClasses[Math.min(index + 2, staggerClasses.length - 1)]}
              >
                <BlogCard post={post} />
                {index < posts.length - 1 && (
                  <hr className="mt-8 border-ink-100 dark:border-ink-800" />
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticlesPage;
