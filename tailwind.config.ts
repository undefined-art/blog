import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm, earthy palette inspired by vintage paper
        parchment: {
          50: '#fdfbf7',
          100: '#faf5eb',
          200: '#f5ead6',
          300: '#eddbb7',
          400: '#e2c48e',
          500: '#d4a85a',
          600: '#c08d3e',
          700: '#9f7033',
          800: '#825b2e',
          900: '#6b4b28',
        },
        ink: {
          50: '#f6f5f4',
          100: '#e7e5e2',
          200: '#d2cec8',
          300: '#b5afa6',
          400: '#978f83',
          500: '#7c7468',
          600: '#625c52',
          700: '#4d4943',
          800: '#3d3a36',
          900: '#2a2826',
          950: '#1a1918',
        },
        accent: {
          terracotta: '#c45d3a',
          sage: '#6b8f71',
          ochre: '#cc8b3c',
          slate: '#5a6b7a',
          wine: '#8b3a4f',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#3d3a36',
            '--tw-prose-headings': '#2a2826',
            '--tw-prose-links': '#c45d3a',
            '--tw-prose-bold': '#2a2826',
            '--tw-prose-code': '#c45d3a',
            '--tw-prose-quotes': '#4d4943',
            '--tw-prose-quote-borders': '#c45d3a',
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontWeight: '400',
              backgroundColor: '#faf5eb',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d2cec8',
            '--tw-prose-headings': '#faf5eb',
            '--tw-prose-links': '#e2c48e',
            '--tw-prose-bold': '#f5ead6',
            '--tw-prose-code': '#e2c48e',
            '--tw-prose-quotes': '#b5afa6',
            '--tw-prose-quote-borders': '#cc8b3c',
            code: {
              backgroundColor: '#2a2826',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'stagger-1': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        'stagger-2': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'stagger-3': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'stagger-4': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
        'stagger-5': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards',
        'stagger-6': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

