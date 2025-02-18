module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#e5e7eb",
          300: "#cbd5e1", 
          400: "#a0aec0", 
          500: "#6b7280", 
          600: "#4a5568",
          700: "#2d3748",
          800: "#1a202c", 
          900: "#171923",  
        },
        border: {
          DEFAULT: "#4a5568",
        },
      },
    },
  },
  plugins: [],
};
