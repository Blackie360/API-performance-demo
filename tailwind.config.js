/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],

      },
      colors:{
        "primary": {
          "100": "#EDF2F7", 
          "200": "#A0AEC0",
          "300": "#2A4365",
          "400": "#1E3A8A"
        },
        "accent": {
          "100": "#63B3ED",
          "200": "#F6E05E"
        },
        "neutral": {
          "DEFAULT": "#FFFFFF",
          "100": "#E2E8F0",
          "200": "#2D3748"
        },
        "danger": "#E53E3E",
        "success": "#2F855A"
      }
    },
  },
  plugins: [],
}