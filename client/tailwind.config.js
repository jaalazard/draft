/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'arial'],
      },
      colors: {
        'primary' : '#6A5ACD',
        'secondary' : '#FFD700',
        'light' : '#9d8ad0',
        'dark' : '#473b82',
      }
    },
  },
  plugins: [],
}