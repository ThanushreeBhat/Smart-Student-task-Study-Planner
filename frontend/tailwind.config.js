/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Deeper Slate/Black
        glass: "rgba(15, 23, 42, 0.4)", // Darker Glass
        "glass-border": "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#818cf8",
          dark: "#6366f1",
          light: "#a5b4fc",
        },
        secondary: {
          DEFAULT: "#22d3ee", // Cyan
          dark: "#0891b2",
          light: "#67e8f9",
        },
        accent: {
          DEFAULT: "#f472b6", // Pink/Rose
          dark: "#db2777",
          light: "#fbcfe8",
        },
        surface: "#0f172a",
      },
      fontFamily: {
        sans: ["'Outfit'", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
