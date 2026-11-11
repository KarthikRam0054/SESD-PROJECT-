/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        realtor: {
          primary: '#142B4A',       // Deep Navy Blue
          'primary-light': '#1e3e68',
          'primary-dark': '#0d1d32',
          accent: '#14B8A6',        // Teal Green
          'accent-hover': '#0d9488',
          'accent-light': '#ccfbf1',
          bg: '#F5F7FA',            // Light Grey
          card: '#FFFFFF',
          text: '#252B36',          // Dark Grey
          muted: '#64748B',
          border: '#E2E8F0',
          sold: '#EF4444',
          rented: '#F59E0B',
          available: '#10B981'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(20, 43, 74, 0.06), 0 2px 6px -1px rgba(20, 43, 74, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(20, 43, 74, 0.12), 0 8px 10px -6px rgba(20, 43, 74, 0.08)',
        modal: '0 25px 50px -12px rgba(20, 43, 74, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

