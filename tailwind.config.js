/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  // Selector-based dark mode tied to our forced [data-theme="dark"] attribute.
  // This ensures dark: utility classes always apply and never flip with OS preference.
  // Light mode only - dark: classes will not apply
  darkMode: 'class', // Disabled
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#05091A', mid: '#0C1332', light: '#141D42' },
        blue:    { DEFAULT: '#1A6EFF', bright: '#3D8BFF' },
        success: '#00C896',
        muted:   '#7A8AAD',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
