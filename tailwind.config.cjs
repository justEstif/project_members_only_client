/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        page: "250px minmax(400px, 1fr)",
      },
      gridTemplateRows: {
        page: "150px 1fr",
        navbar: "150px 1fr",
      },
    },
    fontFamily: {},
  },
  plugins: [],
};
