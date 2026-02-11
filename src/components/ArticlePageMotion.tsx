'use client';

import { motion } from 'motion/react';

type ArticlePageMotionProps = {
  children: React.ReactNode;
};

export const ArticlePageMotion = ({ children }: ArticlePageMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
};
