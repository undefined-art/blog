'use client';

type ArticleTagFilterProps = {
  tags: string[];
  selectedTags: string[];
  tagCounts: Record<string, number>;
  visibleTags: string[];
  hasMoreTags: boolean;
  showAllTags: boolean;
  hasActiveFilters: boolean;
  onTagToggle: (tag: string) => void;
  onShowAllToggle: () => void;
  onClearFilters: () => void;
};

export const ArticleTagFilter = ({
  tags,
  selectedTags,
  tagCounts,
  visibleTags,
  hasMoreTags,
  showAllTags,
  hasActiveFilters,
  onTagToggle,
  onShowAllToggle,
  onClearFilters,
}: ArticleTagFilterProps) => {
  return (
    <div className="space-y-3">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-500 dark:text-ink-400">Filtered by:</span>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-accent-terracotta dark:bg-accent-ochre text-white transition-all duration-200 hover:opacity-90"
              aria-label={`Remove ${tag} filter`}
            >
              {tag}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink-500 dark:text-ink-400 shrink-0">
          {selectedTags.length > 0 ? 'Add more:' : 'Filter by tags:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {visibleTags
            .filter((tag) => !selectedTags.includes(tag))
            .map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border bg-parchment-50 dark:bg-ink-900/50 text-ink-600 dark:text-parchment-400 border-ink-200 dark:border-ink-700 hover:border-accent-terracotta dark:hover:border-accent-ochre hover:text-accent-terracotta dark:hover:text-accent-ochre transition-all duration-200"
                aria-pressed={false}
              >
                <span>{tag}</span>
                <span className="text-xs text-ink-400 dark:text-ink-500 group-hover:text-accent-terracotta/70 dark:group-hover:text-accent-ochre/70">
                  {tagCounts[tag]}
                </span>
              </button>
            ))}
          {hasMoreTags && (
            <button
              onClick={onShowAllToggle}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full text-accent-terracotta dark:text-accent-ochre hover:bg-accent-terracotta/10 dark:hover:bg-accent-ochre/10 transition-all duration-200"
              aria-expanded={showAllTags}
            >
              {showAllTags ? (
                <>
                  Show less
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
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </>
              ) : (
                <>
                  +{tags.length - visibleTags.length} more
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-1.5 text-sm text-ink-500 dark:text-ink-400 hover:text-accent-terracotta dark:hover:text-accent-ochre transition-colors duration-200 underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};
