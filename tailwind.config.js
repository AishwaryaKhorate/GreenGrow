/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eefbf3',
          100: '#d6f5e1',
          200: '#aeeac8',
          300: '#79d9a9',
          400: '#43c087',
          500: '#22a56d',
          600: '#16855a',
          700: '#146a49',
          800: '#14543c',
          900: '#0f3d2c',
          950: '#08241a',
        },
        wheat: {
          50: '#fffaeb',
          100: '#fdf0c8',
          400: '#f6b93b',
          500: '#eea52c',
          600: '#d4841e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 6px -1px rgb(0 0 0 / 0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
