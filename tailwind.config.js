/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mdsm: "900px",
      },
      colors: {
        primary: "#28B7B8",
        primaryDark: "#203436",
      },
    },
    fontFamily: {
      body: [
        "Outfit"
      ],
      sans: [
        "Outfit"
      ],
    },
  },
  plugins: [],
};
