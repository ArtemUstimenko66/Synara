/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',  // mobile
      'md': '768px',  // tablet
      'xl': '1025px', // desktop
    },
    extend: {
      colors: {
        'almost-black': '#000000',
        'almost-white': '#FFFFFF',
        'dark-blue': '#1F74D5',
        'light-blue': '#36ACEC',
        'perfect-yellow': '#FAA206'
      },
      fontFamily: {
        kharkiv: ['Kharkiv Tone', 'sans-serif'],
        montserratMedium: ['Montserrat-Medium', 'sans-serif'],
        montserratRegular: ['Montserrat-Regular', 'sans-serif'],
      },
      fontSize: {
        h_num: '96pt',
        h1: '50pt',
        h2: '36pt',
        h3: '24pt',
        h4: '22pt',
        h5: '18pt',
        pl: '12pt',
        ps: '10pt',
        psm: '8pt',
      },
    },
  },
  plugins: [],
}