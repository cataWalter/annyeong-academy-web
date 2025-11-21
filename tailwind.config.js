/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6a11cb',
          blue: '#2575fc',
          dark: '#192335',
        }
      }
    },
  },
  plugins: [],
}
