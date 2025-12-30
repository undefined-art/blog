import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Monulph - Front-End Engineer with 5+ years of experience.',
};

const techStack = {
  frontend: {
    title: 'Frontend',
    icon: '📱',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Zustand'],
  },
  backend: {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Node.js', 'Golang', 'Nest.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'RabbitMQ', 'Microservices'],
  },
  devops: {
    title: 'DevOps',
    icon: '🐳',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  },
  tools: {
    title: 'Tools',
    icon: '🛠️',
    skills: ['Git', 'Cursor', 'Figma', 'Postman', 'Jira', 'Playwright', 'Cypress', 'Jest', 'Turborepo', 'Web Vitals', 'Redis'],
  },
};

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink-900 dark:text-parchment-100 mb-4 animate-fade-in">
          About Me
        </h1>
        <p className="text-lg text-ink-500 dark:text-ink-400 animate-stagger-1">
          @undefined-art · Monulph
        </p>
      </div>
      <div className="animate-stagger-2 mt-8">
        <p className="text-xl text-ink-600 dark:text-parchment-400 leading-relaxed">
          Front-End Engineer with <span className="text-accent-terracotta dark:text-accent-ochre font-semibold">5+ years</span> of
          experience building modern web applications. I'm passionate about clean code,
          great user experiences, and the intersection of design and development.
        </p>
        <p className="mt-4 text-lg text-ink-500 dark:text-parchment-500 italic">
          "Code is poetry, bugs are features, and coffee is life ☕"
        </p>
      </div>
      <div className="animate-stagger-3 mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 mb-8">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(techStack).map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-parchment-100 to-parchment-50 dark:from-ink-900 dark:to-ink-950 border border-ink-100 dark:border-ink-800 p-6 transition-all duration-300 hover:border-accent-terracotta/50 dark:hover:border-accent-ochre/50 hover:shadow-lg hover:shadow-accent-terracotta/5 dark:hover:shadow-accent-ochre/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-terracotta/0 to-accent-terracotta/0 dark:from-accent-ochre/0 dark:to-accent-ochre/0 group-hover:from-accent-terracotta/5 group-hover:to-transparent dark:group-hover:from-accent-ochre/5 transition-all duration-300" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-parchment-100">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/80 dark:bg-ink-800/80 text-ink-700 dark:text-parchment-300 border border-ink-100 dark:border-ink-700 transition-colors duration-200 hover:border-accent-terracotta dark:hover:border-accent-ochre hover:text-accent-terracotta dark:hover:text-accent-ochre"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="animate-stagger-4 mt-12">
        <div className="rounded-2xl bg-gradient-to-r from-ink-900 to-ink-800 dark:from-ink-950 dark:to-ink-900 p-6 text-parchment-100 font-mono text-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-accent-sage">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-ink-400">terminal</span>
          </div>
          <div className="space-y-2">
            <p><span className="text-accent-ochre">$</span> whoami</p>
            <p className="text-ink-400 pl-4">Monulph - Front-End Engineer</p>
            <p><span className="text-accent-ochre">$</span> echo $STATUS</p>
            <p className="text-ink-400 pl-4">🔴 Not Looking for a Job</p>
            <p><span className="text-accent-ochre">$</span> echo $LOCATION</p>
            <p className="text-ink-400 pl-4">🌍 Remote / Worldwide</p>
            <p><span className="text-accent-ochre">$</span> uptime</p>
            <p className="text-ink-400 pl-4">5+ years of coding experience</p>
            <p className="animate-pulse"><span className="text-accent-ochre">$</span> <span className="inline-block w-2 h-4 bg-parchment-100 ml-1" /></p>
          </div>
        </div>
      </div>
      <div className="animate-stagger-5 mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 mb-6">
          What I Write About
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '💻', text: 'Web development & modern frameworks' },
            { icon: '🎨', text: 'Design systems & UI/UX' },
            { icon: '⚡', text: 'Performance optimization' },
            { icon: '🏗️', text: 'System design & architecture' },
            { icon: '🔧', text: 'Developer tools & productivity' },
            { icon: '🌐', text: 'Open source contributions' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 p-3 rounded-xl bg-parchment-100/50 dark:bg-ink-900/50 border border-transparent hover:border-ink-200 dark:hover:border-ink-700 transition-colors duration-200"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-ink-600 dark:text-parchment-400">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="animate-stagger-6 mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 mb-6">
          Connect
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/undefined-art"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-900 dark:bg-parchment-100 text-parchment-100 dark:text-ink-900 font-medium hover:opacity-90 transition-opacity duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
      <div className="mt-16 flex items-center gap-4" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
        <span className="text-accent-terracotta dark:text-accent-ochre text-xl">✦ ✦ ✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-accent-terracotta/50 to-transparent dark:from-accent-ochre/50" />
      </div>
    </div>
  );
};

export default AboutPage;
