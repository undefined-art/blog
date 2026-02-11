'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const ThanksContent = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center min-h-[70vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center">
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 dark:text-parchment-100 leading-tight"
          variants={itemVariants}
        >
          Thank You!
        </motion.h1>

        <motion.div className="mt-8 space-y-4" variants={itemVariants}>
          <p className="text-xl md:text-2xl text-ink-600 dark:text-parchment-400 max-w-2xl mx-auto">
            You found the secret page! 🎉
          </p>
          <p className="text-lg text-ink-500 dark:text-parchment-500 max-w-xl mx-auto">
            A heartfelt thank you to everyone who has visited this blog. Your curiosity and support
            mean the world to me.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent-terracotta/10 to-accent-ochre/10 dark:from-accent-terracotta/20 dark:to-accent-ochre/20 border border-accent-terracotta/20 dark:border-accent-ochre/20 max-w-lg mx-auto"
          variants={itemVariants}
        >
          <p className="text-ink-700 dark:text-parchment-200 italic">
            &quot;Every visitor brings a spark of inspiration. Thank you for being part of this
            journey.&quot;
          </p>
          <p className="mt-3 text-sm text-ink-500 dark:text-parchment-400">— undefined-art</p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            href="/articles/"
            className="group px-8 py-4 bg-accent-terracotta dark:bg-accent-ochre text-white rounded-full font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-terracotta/50 dark:focus:ring-accent-ochre/50 focus:ring-offset-2"
            aria-label="Browse all articles"
            tabIndex={0}
          >
            <motion.span whileHover={{ x: 2 }}>Explore Articles</motion.span>
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
            className="px-8 py-4 border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-parchment-300 rounded-full font-medium hover:bg-parchment-100 dark:hover:bg-ink-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink-400 dark:focus:ring-ink-500 focus:ring-offset-2"
            aria-label="Go back to homepage"
            tabIndex={0}
          >
            Back to Home
          </Link>
        </motion.div>

        <motion.div className="mt-16" variants={itemVariants}>
          <p className="mt-4 text-sm text-ink-400 dark:text-ink-500">
            Keep exploring, keep learning, keep creating.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
