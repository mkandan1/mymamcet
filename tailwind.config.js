/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        sen: ['Sen', 'sans-serif']
      },
      colors: {
        'para-sec': '#9197A5',
        'sec-blue': '#1E2334',
      },
      gridTemplateColumns: {
        'custom': 'repeat(12, minmax(50px, 1fr))', // 12 columns with flexible widths
      },
      gridTemplateRows: {
        'custom': 'repeat(12, minmax(50px, 1fr))'
      },
      height: {
        '50': '50px'
      },
      spacing: {
        '16': '16px', // Define the gutter size
      },
    },
  },
  plugins: [],
}

