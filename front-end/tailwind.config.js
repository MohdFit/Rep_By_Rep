/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "1024px",
    },
    extend: {
      colors: {
        customOrange1: "#FF5800",
        customOrange2: "#FFB800",
        homepageColor: "#11131B",
        textColor: "#0E1830",
      },
      fontFamily: {
        babas: ['"Bebas Neue"', "sans-serif"],
        poppins: ['"Poppins", sans-serif'],
      },
    },
  },
  plugins: [],
};
