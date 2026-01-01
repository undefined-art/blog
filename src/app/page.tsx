import Link from 'next/link';

const techBadges = [
  { name: 'Next.js', color: 'from-neutral-500/20 to-neutral-600/20 border-neutral-500/30' },
  { name: 'Golang', color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30' },
  { name: 'Nest.js', color: 'from-green-500/20 to-green-600/20 border-green-500/30' },
  { name: 'TypeScript', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30' },
  { name: 'Storybook', color: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30' },
  { name: 'Playwright', color: 'from-teal-500/20 to-teal-600/20 border-teal-500/30' },
];

const staggerClasses = [
  'animate-stagger-1',
  'animate-stagger-2',
  'animate-stagger-3',
  'animate-stagger-4',
  'animate-stagger-5',
  'animate-stagger-6',
];

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-32 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="mb-8 animate-scale-in">
          <span className="text-6xl md:text-8xl animate-bounce transition-all duration-300 inline-block">✦</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 dark:text-parchment-100 leading-tight animate-fade-in">
          undefined-art
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-ink-600 dark:text-parchment-400 max-w-xl mx-auto animate-stagger-1">
          Front-End Engineer. Code enthusiast. <br className="hidden md:block" />
          Building beautiful web experiences.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-stagger-2">
          <Link
            href="/articles/"
            className="px-8 py-3 bg-accent-terracotta dark:bg-accent-ochre text-white rounded-full font-medium hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-terracotta/25 dark:hover:shadow-accent-ochre/25"
          >
            Read Articles
          </Link>
          <a
            href="https://github.com/undefined-art"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-parchment-300 rounded-full font-medium hover:bg-parchment-100 dark:hover:bg-ink-800 transition-all duration-200"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div className="mt-20 w-full flex items-center gap-4 animate-stagger-3" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-terracotta/30 to-transparent dark:via-accent-ochre/30" />
      </div>

      <div className="mt-12 text-center animate-stagger-4">
        <p className="text-sm text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-6">
          Tech Stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techBadges.map((tech, index) => (
            <span
              key={tech.name}
              className={`px-4 py-2 rounded-xl bg-gradient-to-br ${tech.color} border text-ink-700 dark:text-parchment-200 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${staggerClasses[index] ?? 'animate-stagger-6'}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
