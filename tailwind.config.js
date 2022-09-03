/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rtob': 'linear-gradient(to right, #FF033E 0%, #FA0442 4.7%, #F40646 8.9%, #ED084C 12.8%, #E60A52 16.56%, #DC0C58 20.37%, #D20F61 24.4%, #C5136A 28.83%, #B71675 33.84%, #A61B82 39.6%, #932091 46.3%, #7D26A2 54.1%, #632DB5 63.2%, #4735CB 73.76%, #273DE4 85.97%, #0347FF 100%);',
        'd-rtob': 'linear-gradient(to bottom right, #FF033E 0%, #FA0442 4.7%, #F40646 8.9%, #ED084C 12.8%, #E60A52 16.56%, #DC0C58 20.37%, #D20F61 24.4%, #C5136A 28.83%, #B71675 33.84%, #A61B82 39.6%, #932091 46.3%, #7D26A2 54.1%, #632DB5 63.2%, #4735CB 73.76%, #273DE4 85.97%, #0347FF 100%);',
      },
      colors: {
        'ptr-red': "#FF033E",
        'ptr-blue': "#0347FF"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
