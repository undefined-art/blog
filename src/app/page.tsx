'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { fadeIn, staggerContainer } from '@/components/motion/variants';

const techBadges = [
  { name: 'Next.js', color: 'from-neutral-500/20 to-neutral-600/20 border-neutral-500/30' },
  { name: 'Golang', color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30' },
  { name: 'Nest.js', color: 'from-green-500/20 to-green-600/20 border-green-500/30' },
  { name: 'TypeScript', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30' },
  { name: 'Storybook', color: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30' },
  { name: 'Playwright', color: 'from-teal-500/20 to-teal-600/20 border-teal-500/30' },
];

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        className="text-center"
        variants={staggerContainer(0.08, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 dark:text-parchment-100 leading-tight"
          variants={fadeIn(20, 0.5)}
        >
          undefined-art
        </motion.h1>
        <motion.p
          className="mt-6 text-xl md:text-2xl text-ink-600 dark:text-parchment-400 max-w-xl mx-auto"
          variants={fadeIn(20, 0.5)}
        >
          Front-End Engineer. Code enthusiast. <br className="hidden md:block" />
          Building beautiful web experiences.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeIn(20, 0.5)}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/articles/"
              className="inline-block px-8 py-3 bg-accent-terracotta dark:bg-accent-ochre text-white rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-accent-terracotta/50 dark:focus:ring-accent-ochre/50 focus:ring-offset-2 dark:focus:ring-offset-ink-950"
              aria-label="Read articles"
            >
              Read Articles
            </Link>
          </motion.div>
          <motion.a
            href="https://github.com/undefined-art"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-parchment-300 rounded-full font-medium hover:bg-parchment-100 dark:hover:bg-ink-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ink-400 dark:focus:ring-ink-500 focus:ring-offset-2"
            aria-label="View GitHub profile"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20 w-full flex items-center gap-4"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-terracotta/30 to-transparent dark:via-accent-ochre/30" />
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        variants={fadeIn(16, 0.5)}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <p className="text-sm text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-6">
          Tech Stack
        </p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate="visible"
        >
          {techBadges.map((tech) => (
            <motion.span
              key={tech.name}
              variants={fadeIn(20, 0.5)}
              className={`px-4 py-2 rounded-xl bg-gradient-to-br ${tech.color} border text-ink-700 dark:text-parchment-200 text-sm font-medium backdrop-blur-sm`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
