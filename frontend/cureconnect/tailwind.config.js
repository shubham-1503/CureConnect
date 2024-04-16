/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': '#3AAFA9', 
        'secondaryColor': '#17252A', 
        'backgroundColor': '#FFF9F0', 
        'darkPrimary':'#2B7A78', 
        'whiteColor':'#FEFFFF'
      },
      screens: {
        'xs': '410px',
      },
      animation: {
        'bounce-short': 'splash 1s normal forwards ease-in-out'
      }
    },
  },
  plugins: [
  ],
}
