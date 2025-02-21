/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
      primaryBlue: "#1E3A8A",
      hoverEffectBlue:"#3B82F6"
    }
    },
  },
  plugins: [],
};
