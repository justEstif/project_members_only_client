/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        site: "250px minmax(400px, 1fr)",
        page: "minmax(400px, 1fr) 350px",
      },
      gridTemplateRows: {
        layout: "150px 1fr",
        navbar: "150px 1fr",
      },
    },
    fontFamily: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
