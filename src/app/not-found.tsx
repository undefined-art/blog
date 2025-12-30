import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="animate-fade-in">
        <div className="relative inline-block">
          <span className="text-9xl font-display font-bold text-parchment-200 dark:text-ink-800">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-4xl animate-float">
            ✦
          </span>
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold text-ink-900 dark:text-parchment-100">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-ink-600 dark:text-parchment-400 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-accent-terracotta dark:bg-accent-ochre text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

