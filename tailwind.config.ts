import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem', lg: '3rem' } },
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#1E2B5E',
          950: '#0D1433',
          900: '#121A3D',
          800: '#1E2B5E',
          700: '#2B3C7E',
          600: '#3D51A0',
          200: '#C9D0E8',
          100: '#E7EAF4',
          50: '#F2F4FA',
        },
        cotton: { DEFAULT: '#F7F3EC', 100: '#FBF9F5', 200: '#EFE8DC', 300: '#E3D9C8' },
        rust: { DEFAULT: '#A4471F', 600: '#8C3B18', 100: '#F4E3DA' },
        ochre: { DEFAULT: '#C8912E', 700: '#8A6212', 100: '#F6EBD4' },
        ink: { DEFAULT: '#1C1A17', muted: '#5E574D', soft: '#8A8175' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'var(--font-arabic)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'var(--font-arabic)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { brand: '0.28em' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        'fade-in': 'fade-in .4s ease both',
      },
    },
  },
  plugins: [],
};
export default config;
