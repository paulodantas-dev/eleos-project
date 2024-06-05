/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [scrollbar, animate],
};
