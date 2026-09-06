/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#123B6D',
          900: '#0C2846',
          800: '#0F3159',
          700: '#123B6D',
          600: '#1B4E8A',
          500: '#2A63A6',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E5C766',
          deep: '#A88722',
        },
        offwhite: '#F7F5EF',
        charcoal: '#1F2933',
        softgrey: '#E5E7EB',
        bluegrey: '#E2E8EC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter-tight)', '"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1280px',
      },
      borderRadius: {
        card: '14px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
    },
  },
  plugins: [],
}
