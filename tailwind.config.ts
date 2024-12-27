import type { Config } from 'tailwindcss'

import { safelist } from './src/libs/tailwind-utils';

/*
export const variants = [
  'sm', 'md', 'lg', 'xl', '2xl',
   'hover', 'focus', 'active', 'group-hover', 'group-focus', 'group-active', 'dark', 'dark:hover', 'dark:focus', 'dark:active', 'dark:group-hover', 'dark:group-focus', 'dark:group-active', 'sm:hover', 'sm:focus', 'sm:active', 'sm:group-hover', 'sm:group-focus', 'sm:group-active', 'md:hover', 'md:focus', 'md:active', 'md:group-hover', 'md:group-focus', 'md:group-active', 'lg:hover', 'lg:focus', 'lg:active', 'lg:group-hover', 'lg:group-focus', 'lg:group-active', 'xl:hover', 'xl:focus', 'xl:active', 'xl:group-hover', 'xl:group-focus', 'xl:group-active', '2xl:hover', '2xl:focus', '2xl:active', '2xl:group-hover', '2xl:group-focus', '2xl:group-active', 'hover:hover', 
]; 

export const bps = [
*/

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
  safelist,

  plugins: [require('daisyui')],
} satisfies Config

