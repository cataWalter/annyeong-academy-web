/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#4A88B0',   // Seoul Turquoise
          purple: '#5E3891', // Gangnam Purple
          dark: '#192335',
        },
        plum: {
          100: '#E6CEDB',
          500: '#9B3E83',
          700: '#6A2C5D',
        }
      }
    },
  },
  plugins: [],
}
