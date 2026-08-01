'use client';

type ArticlePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const paginationButtonClass =
  'min-w-[40px] h-10 rounded-lg font-medium transition-all duration-200';

const pageButtonClass = (isCurrent: boolean) =>
  `${paginationButtonClass} ${
    isCurrent
      ? 'bg-accent-terracotta dark:bg-accent-ochre text-white'
      : 'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700'
  }`;

const arrowButtonClass =
  'p-2 rounded-lg bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200';

export const ArticlePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlePaginationProps) => {
  const renderPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      const isNearCurrent = Math.abs(page - currentPage) <= 1;
      const isEdge = page === 1 || page === totalPages;

      if (isNearCurrent || isEdge) pages.push(page);
    }

    const items: (number | 'ellipsis')[] = [];
    let previous = 0;

    for (const page of pages) {
      if (page - previous > 1) items.push('ellipsis');
      items.push(page);
      previous = page;
    }

    return items.map((page, index) =>
      page === 'ellipsis' ? (
        <span key={`ellipsis-${index}`} className="px-2 text-ink-400 dark:text-ink-500">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={pageButtonClass(page === currentPage)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <nav className="flex items-center justify-center gap-2 pt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowButtonClass}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowButtonClass}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </nav>
  );
};
