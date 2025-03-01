/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5",
        secondary: "#F5F5F5",
      },
      fontSize: {
        base: "0.875rem", // 14px
        lg: "1rem", // 16px
        xl: "1.125rem", // 18px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem", // 24px
        "4xl": "1.875rem", // 30px
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
