/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          open: ['var(--font-open-sans)', 'sans-serif'],
          poppins: ['var(--font-poppins)', 'sans-serif'],
          lato: ['var(--font-lato)', 'sans-serif'],
          inter: ['var(--font-inter)', 'sans-serif'],
          nunitoSans: ['var(--font-nunito-sans)', 'sans-serif'],
          nunito: ['var(--font-nunito)', 'sans-serif'],
          publicSans: ['var(--font-public-sans)', 'sans-serif'],
          rubik: ['var(--font-rubik)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  