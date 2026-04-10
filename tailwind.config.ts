import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'keja-green': '#0B6623',
        'keja-green-dark': '#059669',
        'keja-green-light': '#D1FAE5',
        'keja-white': '#FFFFFF',
        'keja-gray': '#F3F4F6',
        'keja-text': '#1F2937',
        'keja-border': '#E5E7EB',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'keja': '0 4px 6px rgba(16, 185, 129, 0.1)',
        'keja-hover': '0 10px 15px rgba(16, 185, 129, 0.15)',
      },
      borderRadius: {
        'keja': '8px',
      },
    },
  },
  plugins: [],
}
export default config
