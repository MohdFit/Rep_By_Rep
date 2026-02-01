module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
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
