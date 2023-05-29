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
        primary: '#49d49dff',
        secondary: '#0d5c63ff',
        tertiary: '#f61067ff',
        accent: '#f7567cff',
        'off-black': '#0d0a0bff',
        'off-white': '#ffeddfff',
      },
    },
  },
  plugins: [],
};
