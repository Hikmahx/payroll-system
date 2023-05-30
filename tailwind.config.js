/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'very-dark-gray': '#1A1A1A',
        'dark-gray': '#333333',
        'gray': '#C4C4C4',
        'very-light-gray': "#F2F2F2",
        'white': '#ffffff',
        'transparent': 'transparent',
      },
      screens: {
        '2xl': '1336px'
      }
    },
    fontFamily: {
      'nunito': ["'Nunito Sans'", 'sans-serif'],
    }
  },
  plugins: [],
}
