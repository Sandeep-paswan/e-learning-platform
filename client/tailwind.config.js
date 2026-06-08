/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          500: "#1d9bf0",
          600: "#0c7dd6",
          700: "#0c5da0",
        },
      },
      fontFamily: {
        sans: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 60px rgba(15, 23, 42, 0.16)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
