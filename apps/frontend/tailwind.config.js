/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
  	extend: {
		fontFamily: {
			sans: ["Dm-Sans", "sans-serif"], 
		  },

  		colors: {
			green:{
				primary: "#306844",
				secondary: "#2c4c3b",
				tertiary: "#1e453e",
				quaternary: "#182c25",
				quinary: "#455b55",
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  
}

