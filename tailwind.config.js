/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'header' : "#2C4B94",
        'active-nav' : "#1D3565",
        'filter' : "#121923",
        'active-filter' : "#4B5563",
      },
      spacing: {
        'max-screen' : "calc(100vh - 64px)"
      }
    },
  },
  plugins: [],
}

