/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    screens: {
      xs: { max: "639px" },

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'qause-blue': '#0020CF',
        'qause-blue-dark': '#1B3763',
        'qause-yellow': '#F79E09',
        'qause-yellow-light': '#F7A212',
        'qause-gray': '#EDF1F5',
        'qause-blue-gray': '#414450'
      }
    }
  },
  plugins: [],
};