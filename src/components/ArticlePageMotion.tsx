'use client';

import { motion } from 'motion/react';
import { fadeIn } from '@/components/motion/variants';

type ArticlePageMotionProps = {
  children: React.ReactNode;
};

export const ArticlePageMotion = ({ children }: ArticlePageMotionProps) => {
  return (
    <motion.div variants={fadeIn(16, 0.5)} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};
