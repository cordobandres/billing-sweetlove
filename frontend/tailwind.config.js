/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#EDE7F6",
        sweetPink: "#F4B6C2",
        roseGold: "#E8AEB7",
        mint: "#CDEDEA",
        textDark: "#3A3A3A",
        textSoft: "#7A7A7A",
      }
    },
  },
  plugins: [],
}
