/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'modal-in': 'modalIn 0.3s ease-out',
      },
      keyframes: {
        modalIn: {
          '0%': { opacity: 0, transform: 'scale(0.1)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}
