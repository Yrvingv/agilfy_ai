/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: '#0A0F0D', deep: '#000807' },
        primary:   { DEFAULT: '#00FF41', alt: '#00D436' },
        accent:    '#39FF14',
        secondary: '#0D3023',
        surface:   '#0F1C17',
        neutral:   '#9FB3A7',
        text:      { DEFAULT: '#EAFEF0', soft: '#B6E9C8', inverse: '#0A0F0D' },
      },
      fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto',
               'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji',
               'Segoe UI Emoji', 'Segoe UI Symbol']
      },
      boxShadow: {
        glow: '0 0 24px rgba(0,255,65,0.35)'
      }
    },
  },
  plugins: [],
}
