/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neoBg: "#fdfbf7",
        neoBorder: "#111827",
        neoYellow: "#fef08a",
        neoGreen: "#bbf7d0",
        neoPink: "#fbcfe8",
        neoBlue: "#bfdbfe",
      },
      boxShadow: {
        neo: "4px 4px 0px rgba(17, 24, 39, 1)",
        neoLg: "8px 8px 0px rgba(17, 24, 39, 1)",
        neoHover: "6px 6px 0px rgba(17, 24, 39, 1)",
      },
    },
  },
  plugins: [],
};
