/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'home': "repeat(4, minmax(150px, 400px));",
      }
    },
  },
  plugins: [],
}

