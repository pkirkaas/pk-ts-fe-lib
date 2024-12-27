import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/react-hook-form/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/react-utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js', 
  ],
  plugins: [require('daisyui')],
} satisfies Config

