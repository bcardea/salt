/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out'
      }
    },
    fontFamily: {
      'sans': ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'heading': ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#F5F5F7', // Light blue-tinted white instead of beige
        text: '#7F8C8D', // Neutral Grey
        primary: {
          50: '#EAF0F5',
          100: '#D5E1EB',
          200: '#BFD3E1',
          300: '#A1C1D7', // Accent Light Blue
          400: '#83AEC8',
          500: '#6699BA',
          600: '#4983AB',
          700: '#3D7095',
          800: '#345A7C', // Primary Dark Blue
          900: '#294764',
        },
        secondary: {
          50: '#F0F7FC',
          100: '#E1EFF9',
          200: '#C3DFF3',
          300: '#A5CFED',
          400: '#87BFE7',
          500: '#69AFE1', // Accent Blue
          600: '#4B9FDB',
          700: '#2D8FD5',
          800: '#1F7FBF',
          900: '#166FA9',
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
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1.5s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};