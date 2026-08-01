'use client';

import { ITEMS_PER_PAGE_OPTIONS, type SortOrder } from '@/hooks/useArticleFilters';

type ArticleSortControlsProps = {
  totalCount: number;
  startIndex: number;
  itemsPerPage: number;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  onItemsPerPageChange: (value: (typeof ITEMS_PER_PAGE_OPTIONS)[number]) => void;
};

const activeClass = 'bg-accent-terracotta dark:bg-accent-ochre text-white';
const inactiveClass =
  'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700';

export const ArticleSortControls = ({
  totalCount,
  startIndex,
  itemsPerPage,
  sortOrder,
  onSortChange,
  onItemsPerPageChange,
}: ArticleSortControlsProps) => {
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
      <p className="text-sm text-ink-500 dark:text-ink-400">
        {totalCount === 0 ? (
          'No articles found'
        ) : (
          <>
            Showing {startIndex + 1}–{endIndex} of {totalCount} article
            {totalCount !== 1 ? 's' : ''}
          </>
        )}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-500 dark:text-ink-400">Sort:</span>
          {(['newest', 'oldest'] as const).map((order) => (
            <button
              key={order}
              onClick={() => onSortChange(order)}
              className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                sortOrder === order ? activeClass : inactiveClass
              }`}
              aria-pressed={sortOrder === order}
            >
              {order === 'newest' ? 'Newest' : 'Oldest'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-500 dark:text-ink-400">Show:</span>
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => onItemsPerPageChange(option)}
              className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                itemsPerPage === option ? activeClass : inactiveClass
              }`}
              aria-pressed={itemsPerPage === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
