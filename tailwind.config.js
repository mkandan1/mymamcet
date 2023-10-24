/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '110': '29rem',
        '120': '35rem'
      } ,
      height: {
        '120': '45rem'
      },
      fontFamily: {
        'inter': ['Inter','sans-serif' ],
        'poppins': ['Poppins','sans-serif' ],
        'red-hat': ['Red Hat Display','sans-serif' ],
        'manrope': ['Manrope','sans-serif' ],
      }
    },
  },
  plugins: [],
}

