'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import type { BlogPostMeta } from '@/lib/types';

type ArticlesListProps = {
    posts: BlogPostMeta[];
    allTags: string[];
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20] as const;
type SortOrder = 'newest' | 'oldest';

const INITIAL_TAGS_SHOWN = 6;

export const ArticlesList = ({ posts, allTags }: ArticlesListProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [showAllTags, setShowAllTags] = useState(false);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        posts.forEach((post) => {
            post.tags.forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    }, [posts]);

    const sortedTags = useMemo(() => {
        return [...allTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
    }, [allTags, tagCounts]);

    const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, INITIAL_TAGS_SHOWN);
    const hasMoreTags = sortedTags.length > INITIAL_TAGS_SHOWN;

    const filteredPosts = useMemo(() => {
        const filtered = posts.filter((post) => {
            const matchesSearch =
                searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag));

            return matchesSearch && matchesTags;
        });

        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [posts, searchQuery, selectedTags, sortOrder]);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedTags([]);
        setSortOrder('newest');
        setCurrentPage(1);
    };

    const handleSortChange = (order: SortOrder) => {
        setSortOrder(order);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (value: (typeof ITEMS_PER_PAGE_OPTIONS)[number]) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const hasActiveFilters = searchQuery !== '' || !!selectedTags.length;

    return (
        <div className="space-y-8">
            <div className="space-y-4 animate-stagger-2">
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
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-parchment-100 dark:bg-ink-900 border border-ink-200 dark:border-ink-700 text-ink-800 dark:text-parchment-200 placeholder-ink-400 dark:placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-accent-terracotta/50 dark:focus:ring-accent-ochre/50 focus:border-accent-terracotta dark:focus:border-accent-ochre transition-all duration-200"
                        aria-label="Search articles"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setCurrentPage(1);
                            }}
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
                {allTags.length > 0 && (
                    <div className="space-y-3">
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-ink-500 dark:text-ink-400">Filtered by:</span>
                                {selectedTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagClick(tag)}
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
                                            onClick={() => handleTagClick(tag)}
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
                                        onClick={() => setShowAllTags(!showAllTags)}
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
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                </svg>
                                            </>
                                        ) : (
                                            <>
                                                +{sortedTags.length - INITIAL_TAGS_SHOWN} more
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            {hasActiveFilters && (
                                <button
                                    onClick={handleClearFilters}
                                    className="px-3 py-1.5 text-sm text-ink-500 dark:text-ink-400 hover:text-accent-terracotta dark:hover:text-accent-ochre transition-colors duration-200 underline underline-offset-2"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-sm text-ink-500 dark:text-ink-400">
                        {filteredPosts.length === 0 ? (
                            'No articles found'
                        ) : (
                            <>
                                Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredPosts.length)} of{' '}
                                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                            </>
                        )}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-ink-500 dark:text-ink-400">Sort:</span>
                            <button
                                onClick={() => handleSortChange('newest')}
                                className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${sortOrder === 'newest'
                                    ? 'bg-accent-terracotta dark:bg-accent-ochre text-white'
                                    : 'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700'
                                    }`}
                                aria-pressed={sortOrder === 'newest'}
                            >
                                Newest
                            </button>
                            <button
                                onClick={() => handleSortChange('oldest')}
                                className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${sortOrder === 'oldest'
                                    ? 'bg-accent-terracotta dark:bg-accent-ochre text-white'
                                    : 'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700'
                                    }`}
                                aria-pressed={sortOrder === 'oldest'}
                            >
                                Oldest
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-ink-500 dark:text-ink-400">Show:</span>
                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleItemsPerPageChange(option)}
                                    className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${itemsPerPage === option
                                        ? 'bg-accent-terracotta dark:bg-accent-ochre text-white'
                                        : 'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700'
                                        }`}
                                    aria-pressed={itemsPerPage === option}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {paginatedPosts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-ink-500 dark:text-ink-400 text-lg mb-4">
                        No articles match your search
                    </p>
                    <button
                        onClick={handleClearFilters}
                        className="text-accent-terracotta dark:text-accent-ochre hover:underline font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {paginatedPosts.map((post, index) => (
                        <div key={post.slug}>
                            <BlogCard post={post} />
                            {index < paginatedPosts.length - 1 && (
                                <hr className="mt-8 border-ink-100 dark:border-ink-800" />
                            )}
                        </div>
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <nav
                    className="flex items-center justify-center gap-2 pt-8"
                    aria-label="Pagination"
                >
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        aria-label="Previous page"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const isCurrentPage = page === currentPage;
                        const isNearCurrentPage = Math.abs(page - currentPage) <= 1;
                        const isFirstOrLast = page === 1 || page === totalPages;

                        if (!isNearCurrentPage && !isFirstOrLast) {
                            if (page === 2 || page === totalPages - 1) {
                                return (
                                    <span key={page} className="px-2 text-ink-400 dark:text-ink-500">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        }

                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`min-w-[40px] h-10 rounded-lg font-medium transition-all duration-200 ${isCurrentPage
                                    ? 'bg-accent-terracotta dark:bg-accent-ochre text-white'
                                    : 'bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700'
                                    }`}
                                aria-current={isCurrentPage ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-parchment-100 dark:bg-ink-800 text-ink-600 dark:text-parchment-400 hover:bg-parchment-200 dark:hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        aria-label="Next page"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </nav>
            )}
        </div>
    );
};

