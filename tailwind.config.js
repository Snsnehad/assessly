/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        accent: {
          50: "#ecfdf5",
          500: "#10b981",
          600: "#059669",
        },
      },
      boxShadow: {
        soft: "0 20px 40px rgba(15, 23, 42, 0.08)",
        card: "0 8px 30px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(99,102,241,0.15) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
