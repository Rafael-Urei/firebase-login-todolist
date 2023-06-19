/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      keyframes: {
        show: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "drop-modal": "show 0.5s linear",
      },
    },
  },
  plugins: [],
};
