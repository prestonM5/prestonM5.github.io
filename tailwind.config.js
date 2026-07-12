/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#eeece6',
          200: '#d9d6cc',
          300: '#b8b4a8',
          400: '#8e8a7c',
          500: '#6b675c',
          600: '#4a473f',
          700: '#2f2d27',
          800: '#1c1b17',
          900: '#0e0d0b',
        },
        accent: {
          500: '#9a6a2e',
          600: '#855926',
        },
      },
      letterSpacing: {
        tightish: '-0.014em',
        tighter2: '-0.022em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw': {
          '0%': { strokeDashoffset: 'var(--len, 1000)' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'draw': 'draw 1.6s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      },
    },
  },
  plugins: [],
};
