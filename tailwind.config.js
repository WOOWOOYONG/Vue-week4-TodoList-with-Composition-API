/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans TC', 'sans-serif']
    },
    extend: {}
  },
  plugins: ['prettier-plugin-tailwindcss']
}
