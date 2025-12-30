import type { MDXComponents } from 'mdx/types';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-parchment-100 mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-parchment-100 mt-12 mb-4 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-parchment-100 mt-8 mb-3 scroll-mt-24">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-ink-700 dark:text-parchment-300 leading-relaxed">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-terracotta dark:text-accent-ochre hover:underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return <code className={className}>{children}</code>;
      }
      return (
        <code className="font-mono text-sm bg-parchment-200 dark:bg-ink-800 px-1.5 py-0.5 rounded text-accent-terracotta dark:text-accent-ochre">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-ink-900 border border-ink-700/50 rounded-xl p-4 overflow-x-auto my-6">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-terracotta dark:border-accent-ochre bg-parchment-100/50 dark:bg-ink-900/50 py-3 px-4 my-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 my-4 text-ink-700 dark:text-parchment-300 list-disc list-inside">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 my-4 text-ink-700 dark:text-parchment-300 list-decimal list-inside">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    hr: () => (
      <hr className="my-8 border-ink-200 dark:border-ink-700" />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink-900 dark:text-parchment-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    ...components,
  };
};

