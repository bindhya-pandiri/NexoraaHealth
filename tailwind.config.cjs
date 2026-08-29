/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#FAF8FF',
        'lavender-light': '#F3EEFF',
        'purple-primary': '#8B5CF6',
        'purple-accent': '#7C3AED',
        'purple-deep': '#3B1A7A',
        'purple-contrast': '#2C0A56',
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
