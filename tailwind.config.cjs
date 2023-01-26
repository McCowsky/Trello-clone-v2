/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_blue: "#0079BF",
        bg_column: "#ebecf0",
        hover_grey: "#ffffff4d",
        hover_grey_darker: "#091e4214",
        focus_grey: "ffffff66",
        text_grey: "#5e6c84",
        text_grey_darker: "#172B4D",
        border_grey: "#091e4221",
      },
    },
  },
  plugins: [],
};
