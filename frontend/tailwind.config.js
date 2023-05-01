/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'grayscale-100': '#13141C',
        'grayscale-80': '#1C1D29',
        'grayscale-60': '#2F3146'
      }
    },
  },
  plugins: [],
}
