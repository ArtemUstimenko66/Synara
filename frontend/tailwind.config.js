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
        h_s_num: '72pt',
        h1: '50pt',
        h2: '36pt',
        h2s: '30pt',
        h3: '24pt',
        h4: '22pt',
        h5: '18pt',
        pxl: '15pt',
        pl: '12pt',
        ps: '10pt',
        psm: '8pt',

        'relative-h1': '5vw',      // Relative header 1 size
        'relative-h2': '3.75vw',   // Relative header 2 size
        'relative-h3xl': '3.2vw',   // Relative header 2 size
        'relative-h3': '2.5vw',    // Relative header 3 size
        'relative-h4': '2vw',    // Relative header 3 size
        'relative-pxl': '1.5625vw',// Relative extra large paragraph size
        'relative-pl': '1.25vw',   // Relative large paragraph size
        'relative-ps': '1vw',      // Relative standard paragraph size
        'relative-psm': '0.75vw',  // Relative small paragraph size
      },
      spacing: {
        'relative-sm': 'calc(1rem + 1vw)', // For `md` screens
        'relative-bmd': '-0.2vw', // For `md` screens
            'relative-md': 'calc(2rem + 2vw)', // For `md` screens
        'relative-smlg': 'calc(3rem + 3vw)', // For `md` screens
            'relative-lg': 'calc(4rem + 4vw)', // For `md` screens
            'relative-elg': 'calc(8rem + 8vw)', // For `md` screens
        'relative-xlg': 'calc(10rem + 10vw)', // For `md` screens
            'relative-1/2': 'calc(50% + 1vw)', // For `md` screens
      },
    },
  },
  plugins: [],
}