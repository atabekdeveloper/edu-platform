/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        max900: { max: '900px' },
      },
      colors() {
        return {
          primary: {
            DEFAULT: '#3783C5',
          },
        };
      },
    },
  },
  plugins: [],
};
