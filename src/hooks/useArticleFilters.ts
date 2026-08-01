'use client';

import { useMemo, useState } from 'react';
import type { BlogPostMeta } from '@/lib/types';

export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20] as const;
export type SortOrder = 'newest' | 'oldest';
export const INITIAL_TAGS_SHOWN = 6;

type UseArticleFiltersOptions = {
  posts: BlogPostMeta[];
  allTags: string[];
};

export const useArticleFilters = ({ posts, allTags }: UseArticleFiltersOptions) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<(typeof ITEMS_PER_PAGE_OPTIONS)[number]>(5);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [showAllTags, setShowAllTags] = useState(false);

  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    resetPage();
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    resetPage();
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    resetPage();
  };

  const handleItemsPerPageChange = (value: (typeof ITEMS_PER_PAGE_OPTIONS)[number]) => {
    setItemsPerPage(value);
    resetPage();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortOrder('newest');
    resetPage();
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  const sortedTags = useMemo(
    () => [...allTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0)),
    [allTags, tagCounts]
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = posts.filter((post) => {
      const matchesSearch =
        normalizedQuery === '' ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.description.toLowerCase().includes(normalizedQuery);

      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, searchQuery, selectedTags, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  return {
    searchQuery,
    handleSearchChange,
    handleClearFilters,
    selectedTags,
    handleTagToggle,
    sortOrder,
    handleSortChange,
    itemsPerPage,
    handleItemsPerPageChange,
    currentPage,
    handlePageChange,
    totalPages,
    startIndex,
    paginatedPosts,
    filteredPosts,
    tagCounts,
    sortedTags,
    visibleTags: showAllTags ? sortedTags : sortedTags.slice(0, INITIAL_TAGS_SHOWN),
    hasMoreTags: sortedTags.length > INITIAL_TAGS_SHOWN,
    showAllTags,
    handleShowAllTagsToggle: () => setShowAllTags((prev) => !prev),
    hasActiveFilters: searchQuery !== '' || selectedTags.length > 0,
  };
};

export type ArticleFilters = ReturnType<typeof useArticleFilters>;
