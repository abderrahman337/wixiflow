/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#F8F8F8',
        'custom-task-text' :'#5d5d5d',
      },
      fontFamily: {
        'sf-pro': ['SFProDisplay', 'sans-serif'], // Add your custom font
      },

      scrollbar: {
        hide: {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&': {
            '-ms-overflow-style': 'none',  /* IE and Edge */
            'scrollbar-width': 'none',      /* Firefox */
          },
        },
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
