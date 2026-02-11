'use client';

import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('./Aurora').then((mod) => mod.Aurora), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950"
      aria-hidden="true"
    />
  ),
});

export const AuroraBackground = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute inset-0 opacity-40 dark:opacity-50">
      <Aurora
        colorStops={['#5a3a6b', '#cc8b3c', '#6b8f71']}
        amplitude={1}
        blend={0.5}
        speed={0.8}
        className="w-full h-full"
      />
    </div>
  </div>
);
