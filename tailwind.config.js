/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
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
      },
      colors: {
        'fig-orange': '#FBBC05',
        'fig-green' : '#46D26B',
      },
    },
  },
  plugins: [],
});

