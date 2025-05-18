/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f1f1ee',
        text: '#231f20',
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        secondary: {
          50: '#f8f8f7',
          100: '#f1f1ee',
          200: '#e8e8e4',
          300: '#d4d4cc',
          400: '#a3a39b',
          500: '#82827a',
          600: '#656560',
          700: '#4d4d49',
          800: '#363633',
          900: '#231f20',
          950: '#1a1718',
        },
        accent: {
          50: '#f7f7f5',
          100: '#e9e9e4',
          200: '#d4d4cc',
          300: '#b8b8ac',
          400: '#9a9a8b',
          500: '#81816f',
          600: '#6b6b5a',
          700: '#575748',
          800: '#46463a',
          900: '#2d2d25',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Young Serif', 'serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1.5s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};