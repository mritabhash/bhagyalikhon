/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF6EC',
          50: '#FEFCF6',
          100: '#FBF6EC',
          200: '#F7EFDF',
        },
        ivory: '#F5EBD8',
        parchment: {
          DEFAULT: '#EADDBF',
          deep: '#DEC99F',
        },
        ritual: {
          DEFAULT: '#8C1C13',
          deep: '#6B1410',
        },
        sindoor: {
          DEFAULT: '#C02A22',
          light: '#D5473B',
        },
        alta: {
          DEFAULT: '#B23A48',
          soft: '#CB8088',
        },
        marigold: {
          DEFAULT: '#E8A317',
          light: '#F2C555',
        },
        turmeric: '#CE8A18',
        brass: {
          DEFAULT: '#B8912F',
          dark: '#9C7A28',
        },
        gold: {
          DEFAULT: '#C6A32E',
          antique: '#B08D2E',
          deep: '#9E7C22',
        },
        ink: {
          DEFAULT: '#3B2A1E',
          soft: '#5E4A38',
          muted: '#8A745C',
        },
        heading: '#5A1E14',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        report: ['Spectral', 'Georgia', 'Cambria', 'serif'],
        bengali: ['"Noto Serif Bengali"', 'Fraunces', 'serif'],
      },
      letterSpacing: {
        ritual: '0.28em',
        wide2: '0.16em',
      },
      maxWidth: {
        prose2: '68ch',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(90, 30, 20, 0.04), 0 8px 24px -12px rgba(90, 30, 20, 0.14)',
        'paper-lg': '0 2px 4px rgba(90, 30, 20, 0.05), 0 24px 60px -24px rgba(90, 30, 20, 0.24)',
        'glow-red': '0 0 0 1px rgba(192, 42, 34, 0.18), 0 12px 40px -12px rgba(192, 42, 34, 0.35)',
        'glow-gold': '0 0 0 1px rgba(232, 163, 23, 0.22), 0 12px 44px -12px rgba(232, 163, 23, 0.4)',
        'inset-hair': 'inset 0 0 0 1px rgba(176, 141, 46, 0.35)',
      },
      backgroundImage: {
        'candle-glow':
          'radial-gradient(60% 60% at 50% 40%, rgba(242, 197, 85, 0.22), rgba(242, 197, 85, 0.0) 70%)',
        'gold-sheen':
          'linear-gradient(100deg, #9E7C22 0%, #C6A32E 30%, #F2C555 50%, #C6A32E 70%, #9E7C22 100%)',
        'red-sheen':
          'linear-gradient(100deg, #6B1410 0%, #8C1C13 40%, #C02A22 55%, #8C1C13 70%, #6B1410 100%)',
      },
      transitionTimingFunction: {
        candle: 'cubic-bezier(0.22, 1, 0.36, 1)',
        ritual: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-y-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-24px)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(14px,-10px,0)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.35', filter: 'blur(0px)' },
          '50%': { opacity: '0.85', filter: 'blur(0.4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '100%': { transform: 'translateY(120vh) rotate(220deg)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'scale-in': 'scale-in 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'float-y': 'float-y 7s ease-in-out infinite',
        'float-y-slow': 'float-y-slow 11s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4.5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
      },
    },
  },
  plugins: [],
}
