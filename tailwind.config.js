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
        'conversation-not-read' : "#F0F0F0",
        'conversation-active' : "#DCE7F4",
        'empty-bg' : "#E4DED9",
        'create-chat' : "#F6F6F6",
        'brand-secondary' : '#D53784',
        'bg-chat-page' : '#FFF6DE'
      },
      spacing: {
        'max-screen' : "calc(100vh - 55px)",
        'list-conversation': "calc(100vh - 108px)"
      }
    },
  },
  plugins: [],
}

