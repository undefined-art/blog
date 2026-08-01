'use client';

type ArticleSearchInputProps = {
  value: string;
  onChange: (query: string) => void;
};

export const ArticleSearchInput = ({ value, onChange }: ArticleSearchInputProps) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400 dark:text-ink-500"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full pl-12 pr-12 py-3 rounded-xl bg-parchment-100 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-800 dark:text-parchment-200 placeholder-ink-400 dark:placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-accent-terracotta/50 dark:focus:ring-accent-ochre/50 focus:border-accent-terracotta dark:focus:border-accent-ochre transition-all duration-200"
        aria-label="Search articles"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-parchment-300 transition-colors"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
