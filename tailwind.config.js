/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'max-lg' : {'max': '500px'},
      }
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      JetBrainsMono: ['JetBrains Mono', 'monospace'],
      Lobster: ['Lobster', 'cursive']
    }
  },
  plugins: [],
}

