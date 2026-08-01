import type { Variants } from 'motion/react';

/** The single design easing curve used across all animations. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeIn = (y = 16, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
});

export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

export const staggerItem = (y = 12, duration = 0.35): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
});

/** Card entrance with an index-based stagger delay. */
export const cardReveal = (stagger = 0.06): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * stagger, duration: 0.4, ease: EASE },
  }),
});

/** Header navigation entrance with an index-based stagger delay. */
export const navItemReveal = (): Variants => ({
  hidden: { opacity: 0, y: -8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05, duration: 0.3, ease: EASE },
  }),
});
