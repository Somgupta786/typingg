/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(90deg, #D5E94E 0%, #E94EB6 100%)',
        'text-gradient2': 'linear-gradient(180deg, #E6C300 0%, #FF8C00 100%)',
      },
      boxShadow: {
        'custom-inset': '0px 2.68px 0.89px 0px rgba(255, 255, 255, 0.15) inset',
        'outer-custom': '0px 1.79px 0px 0px #191A1F', 
      },
      keyframes: {
        gradient: {
          "0%": { backgroundImage: "linear-gradient(90deg, #E94EB6 0%, #624EE9 100%)" },
          "33%": { backgroundImage: "linear-gradient(90deg, #624EE9 0%, #E9A04E 100%)" },
          "66%": { backgroundImage: "linear-gradient(90deg, #E9A04E 0%, #78E94E 100%)" },
          "100%": { backgroundImage: "linear-gradient(90deg, #E94EB6 0%, #624EE9 100%)" },
        },
      },
      animation: {
        gradient: "gradient 5s infinite", // Adjust timing as needed
      },
      fontFamily: {
        ocra: ["OCR A Extended", "sans-serif"],
      },
      colors: {
        Primary: "#D5E94E",
        Secondary: "#EA4F26",
        Surface: "#0A0A0A",
        lightGrey: "#D1D1D1",
        Grey: "#B0B0B0",
        darkGrey: "#3D3D3D"
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
  plugins: [
   
  ],
};
