/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        body: "url(./public/img/icono1.png)",
        body2: "url(./public/img/icono2.png)",
        body3: "url(./public/img/icono3.png)",
        body4: "url(./public/img/cart2.png)"
      }
    }
  },
  plugins: []
};
