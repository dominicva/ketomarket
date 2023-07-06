/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#49d49d',
        secondary: '#09624B',
        'secondary-lighter': '#eaf5eb',
        tertiary: '#f61067',
        accent: '#f7567c',
        'off-black': '#0d0a0b',
        'off-white': '#ffeddf',
      },
    },
  },
  plugins: [],
};
