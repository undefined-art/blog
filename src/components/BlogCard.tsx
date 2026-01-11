import Link from 'next/link';
import { formatDate, resolveAssetPath } from '@/lib/utils';
import type { BlogPostMeta } from '@/lib/types';

type BlogCardProps = {
  post: BlogPostMeta;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="card-hover group">
      <Link
        href={`/articles/${post.slug}/`}
        className="animate-stagger-3 block rounded-2xl md:hover:bg-parchment-100/50 dark:md:hover:bg-ink-900/50 transition-colors duration-300"
        aria-label={`Read article: ${post.title}`}
      >
        {post.image && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <img
              src={resolveAssetPath(post.image)}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="md:hover:p-6 transition-all duration-300">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-sage/10 text-accent-sage dark:bg-accent-sage/20 dark:text-accent-sage"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 dark:text-parchment-100 group-hover:text-accent-terracotta dark:group-hover:text-accent-ochre transition-colors duration-200">
            {post.title}
          </h2>
          <p className="mt-3 text-ink-600 dark:text-parchment-400 line-clamp-2">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-ink-400 dark:text-ink-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-current" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-accent-terracotta dark:text-accent-ochre font-medium text-sm md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>Read article</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
};
