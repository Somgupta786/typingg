/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ocra: ["OCR A Extended", "sans-serif"],
      },
      colors: {
        Primary: "#D5E94E",
        Secondary: "#EA4F26",
        Surface: "#0A0A0A",
      },
      screens: {
        "2xl": { max: "1535px" },
        "1xl": { min: "1435px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        lg1: { max: "1065px" },
        md1: { max: "850px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        mob: { max: "495px" },
        mob1: { max: "585px" },
        mini1: { max: "410px" },
        mini: { max: "340px" },
      },
    },
  },
  plugins: [],
};
