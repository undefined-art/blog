'use client';

import { motion } from 'motion/react';
import { BlogCard } from './BlogCard';
import { ArticleSearchInput } from './ArticleSearchInput';
import { ArticleTagFilter } from './ArticleTagFilter';
import { ArticleSortControls } from './ArticleSortControls';
import { ArticlePagination } from './ArticlePagination';
import { useArticleFilters } from '@/hooks/useArticleFilters';
import { fadeIn, staggerContainer, staggerItem } from '@/components/motion/variants';
import type { BlogPostMeta } from '@/lib/types';

type ArticlesListProps = {
  posts: BlogPostMeta[];
  allTags: string[];
};

export const ArticlesList = ({ posts, allTags }: ArticlesListProps) => {
  const filters = useArticleFilters({ posts, allTags });

  return (
    <div className="space-y-8">
      <motion.div
        className="space-y-4"
        variants={fadeIn(8, 0.4)}
        initial="hidden"
        animate="visible"
      >
        <ArticleSearchInput value={filters.searchQuery} onChange={filters.handleSearchChange} />

        {allTags.length > 0 && (
          <ArticleTagFilter
            tags={filters.sortedTags}
            selectedTags={filters.selectedTags}
            tagCounts={filters.tagCounts}
            visibleTags={filters.visibleTags}
            hasMoreTags={filters.hasMoreTags}
            showAllTags={filters.showAllTags}
            hasActiveFilters={filters.hasActiveFilters}
            onTagToggle={filters.handleTagToggle}
            onShowAllToggle={filters.handleShowAllTagsToggle}
            onClearFilters={filters.handleClearFilters}
          />
        )}

        <ArticleSortControls
          totalCount={filters.filteredPosts.length}
          startIndex={filters.startIndex}
          itemsPerPage={filters.itemsPerPage}
          sortOrder={filters.sortOrder}
          onSortChange={filters.handleSortChange}
          onItemsPerPageChange={filters.handleItemsPerPageChange}
        />
      </motion.div>

      {filters.paginatedPosts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-ink-500 dark:text-ink-400 text-lg mb-4">
            No articles match your search
          </p>
          <button
            onClick={filters.handleClearFilters}
            className="text-accent-terracotta dark:text-accent-ochre hover:underline font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          className="space-y-8"
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
        >
          {filters.paginatedPosts.map((post, index) => (
            <motion.div key={post.slug} variants={staggerItem()}>
              <BlogCard post={post} index={index} />
              {index < filters.paginatedPosts.length - 1 && (
                <hr className="mt-8 border-ink-100 dark:border-ink-800" />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {filters.totalPages > 1 && (
        <ArticlePagination
          currentPage={filters.currentPage}
          totalPages={filters.totalPages}
          onPageChange={filters.handlePageChange}
        />
      )}
    </div>
  );
};
