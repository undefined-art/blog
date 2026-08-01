'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { EASE } from '@/components/motion/variants';

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const SectionReveal = ({ children, className = '', delay = 0 }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
};
