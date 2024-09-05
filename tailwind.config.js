/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	
  theme: {
    extend: {
      
    },

		gridTemplateColumns: {
			// Указываете количество колонок здесь
			'12': 'repeat(12, minmax(0, 1fr))', // Например, для 12 колонок
			'16': 'repeat(16, minmax(0, 1fr))', // Или для 16 колонок
			'17': 'repeat(17, minmax(0, 1fr))',
			// Добавьте любое другое количество колонок, которое вам нужно
		},

		fontFamily: {
			sans: ['Montserrat', 'sans-serif'], // Настройка шрифта Montserrat
		},

		fontSize: {
      '1xl': '0.75rem', // 12px
      '2xl': '1rem',    // 16px
      '3xl': '1.125rem', // 18px
      '4xl': '1.25rem', // 20px
      '5xl': '1.5rem',  // 24px
      '6xl': '1.875rem', // 30px
			'7xl': '2.2rem', // 30px
			
		},

		screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
  },
  plugins: [],
};
