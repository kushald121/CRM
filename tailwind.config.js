/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f4fd',
          100: '#d1e9fb',
          200: '#a3d3f7',
          300: '#75bdf3',
          400: '#4aa9f0',
          500: '#4A9FF5', // Main blue from screenshot
          600: '#3b7fc4',
          700: '#2c5f93',
          800: '#1d3f62',
          900: '#0e2031',
        },
        status: {
          active: '#22c55e',     // Green for security/active
          security: '#22c55e',   // Green
          warning: '#eab308',    // Yellow for pending
          terminated: '#ef4444', // Red for directors/terminated
          directors: '#ef4444',  // Red
        }
      },
    },
  },
  plugins: [],
}

