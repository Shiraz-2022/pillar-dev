/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FCFCFC",
          default: "#D6D6D6",
        },
        secondary: {
          light: "#6B675E",
        },
        accent: {},
        neutral: {
          light: "#FFAC34",
          default: "#6F6097",
        },
      },
      fontSize: {
        "2xs": [
          "0.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
