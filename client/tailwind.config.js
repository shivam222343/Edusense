/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent colors (same for both themes)
        'accent-teal': '#0FE3D2',
        'accent-orange': '#FF7A65',

        // Dark theme colors
        'dark-bg': '#000000',
        'dark-panel': '#111111',
        'dark-card': '#181818',
        'dark-border': '#222222',

        // Light theme colors
        'light-bg': '#F8F9FA',
        'light-panel': '#FFFFFF',
        'light-card': '#F1F3F5',
        'light-border': '#E9ECEF',
        'light-text': '#212529',
        'light-text-secondary': '#6C757D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}