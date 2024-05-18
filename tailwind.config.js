/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "38rem",
        120: "34rem",
      },
      borderWidth: {
        1: "1px",
        0.1: "0.2rem",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
