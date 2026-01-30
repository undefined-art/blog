import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'A heartfelt thank you to all our visitors.',
  robots: {
    index: false,
    follow: false,
  },
};

const ThanksPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="mb-6 animate-scale-in">
          <span className="text-7xl md:text-9xl animate-pulse transition-all duration-300 inline-block">
            💖
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 dark:text-parchment-100 leading-tight animate-fade-in">
          Thank You!
        </h1>

        <div className="mt-8 space-y-4 animate-stagger-1">
          <p className="text-xl md:text-2xl text-ink-600 dark:text-parchment-400 max-w-2xl mx-auto">
            You found the secret page! 🎉
          </p>
          <p className="text-lg text-ink-500 dark:text-parchment-500 max-w-xl mx-auto">
            A heartfelt thank you to everyone who has visited this blog.
            Your curiosity and support mean the world to me.
          </p>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent-terracotta/10 to-accent-ochre/10 dark:from-accent-terracotta/20 dark:to-accent-ochre/20 border border-accent-terracotta/20 dark:border-accent-ochre/20 max-w-lg mx-auto animate-stagger-2">
          <p className="text-ink-700 dark:text-parchment-200 italic">
            &quot;Every visitor brings a spark of inspiration. Thank you for being part of this journey.&quot;
          </p>
          <p className="mt-3 text-sm text-ink-500 dark:text-parchment-400">
            — undefined-art
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-stagger-3">
          <Link
            href="/articles/"
            className="group px-8 py-4 bg-accent-terracotta dark:bg-accent-ochre text-white rounded-full font-medium hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-terracotta/25 dark:hover:shadow-accent-ochre/25 flex items-center gap-2"
            aria-label="Browse all articles"
            tabIndex={0}
          >
            <span>Explore Articles</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-parchment-300 rounded-full font-medium hover:bg-parchment-100 dark:hover:bg-ink-800 transition-all duration-200"
            aria-label="Go back to homepage"
            tabIndex={0}
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-16 animate-stagger-4">
          <div className="flex items-center justify-center gap-3">
            {['✨', '🌟', '💫', '⭐', '🌙'].map((emoji, index) => (
              <span
                key={index}
                className="text-2xl animate-bounce"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-hidden="true"
              >
                {emoji}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-400 dark:text-ink-500">
            Keep exploring, keep learning, keep creating.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThanksPage;
