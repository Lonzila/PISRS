/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pravniska-slika': "url('/src/assets/pravniska-slika.jpg')",
        'domennastja-slika': "url('/src/assets/domennastjaUSA.jpg')",
      },
    },
  },
  plugins: [],

};