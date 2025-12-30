'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export const Header = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-parchment-50/80 dark:bg-ink-950/80 border-b border-ink-100 dark:border-ink-800">
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 hover:text-accent-terracotta dark:hover:text-accent-ochre transition-colors duration-200"
            aria-label="Go to homepage"
          >
            ✦ Tech grove
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/articles/"
              className="link-underline text-ink-600 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 transition-colors duration-200"
            >
              Articles
            </Link>
            <Link
              href="/about/"
              className="link-underline text-ink-600 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 transition-colors duration-200"
            >
              About
            </Link>
            <a
              href="https://github.com/undefined-art"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink-600 dark:text-parchment-300 hover:text-ink-900 dark:hover:text-parchment-100 transition-colors duration-200"
            >
              GitHub
            </a>
            <button
              onClick={handleThemeToggle}
              onKeyDown={handleKeyDown}
              className="p-2 rounded-full bg-parchment-100 dark:bg-ink-800 hover:bg-parchment-200 dark:hover:bg-ink-700 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              tabIndex={0}
            >
              {!mounted ? (
                <div className="w-5 h-5" aria-hidden="true" />
              ) : theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-ink-700"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-parchment-300"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
