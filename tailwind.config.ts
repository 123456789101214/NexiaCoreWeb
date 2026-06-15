import type { Config } from 'tailwindcss';

const config: Config = {
  // ✅ REQUIRED for theme toggler to work
  darkMode: 'class',

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        // PrimeSoftCore brand colors
        brand: {
          blue:  '#2563eb',
          teal:  '#0d9488',
          amber: '#f59e0b',
          dark:  '#0f172a',
        },
      },
      fontFamily: {
        // Geist already loaded via next/font in layout.tsx
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':         'marquee var(--marquee-duration, 30s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 30s) linear infinite',
        'shimmer':         'shimmer-slide 2.5s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};

export default config;
