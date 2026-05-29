/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b8efff',
          200: '#7de0ff',
          300: '#33c7ff',
          400: '#12a6ff',
          500: '#0095ff',
          600: '#0077d6',
          700: '#0559a8',
          800: '#06437f',
          900: '#082c5c',
          950: '#03182e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#111827',
          900: '#0b1120',
          950: '#020510',
        },
        accent: {
          50: '#fff0ff',
          100: '#ffe0ff',
          200: '#ffb3ff',
          300: '#ff7dfd',
          400: '#ff4ef5',
          500: '#e11dff',
          600: '#b91cdb',
          700: '#861fb1',
          800: '#58197a',
          900: '#3b0f4f',
          950: '#1e092d',
        },
        success: '#22c55e',
        error: '#fb7185',
        warning: '#fbbf24',
        info: '#38bdf8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 6px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 16px 40px 0 rgba(31, 38, 135, 0.5)',
      },
      backdropBlur: {
        'glass': 'blur(4px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
