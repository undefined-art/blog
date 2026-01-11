import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog';
import { resolveAssetPath } from '@/lib/utils';
import { MDXContent } from '@/components/MDXContent';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      ...(post.image && { images: [{ url: resolveAssetPath(post.image) }] }),
    },
  };
};

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <Link
        href="/articles/"
        className="inline-flex items-center gap-2 text-ink-500 dark:text-ink-400 hover:text-accent-terracotta dark:hover:text-accent-ochre transition-colors duration-200 mb-8 animate-fade-in"
        aria-label="Go back to all articles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back to articles</span>
      </Link>
      <article>
        <header className="mb-12 animate-stagger-1">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-sage/10 text-accent-sage dark:bg-accent-sage/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 dark:text-parchment-100 leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-ink-600 dark:text-parchment-400">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-ink-400 dark:text-ink-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
          {post.image && (
            <div className="mt-8 overflow-hidden rounded-xl">
              <img
                src={resolveAssetPath(post.image)}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <div className="mt-8 flex items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
            <span className="text-accent-terracotta dark:text-accent-ochre">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
          </div>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none animate-stagger-2">
          <MDXContent content={post.content} />
        </div>
        <footer className="mt-16">
          <div className="flex items-center gap-4 mb-8" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
            <span className="text-accent-terracotta dark:text-accent-ochre">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
          </div>
          <div className="text-center">
            <p className="text-ink-500 dark:text-ink-400 mb-4">
              Thanks for reading! If you enjoyed this article, feel free to share it.
            </p>
            <Link
              href="/articles/"
              className="inline-flex items-center gap-2 text-accent-terracotta dark:text-accent-ochre hover:underline font-medium"
            >
              <span>Browse more articles</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ArticlePage;
