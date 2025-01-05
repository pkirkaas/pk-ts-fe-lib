/**
 * For use in tailwind.config.ts, and other Tailwind
 * utilities.
 *
 * Primary exports:
 * `safelist` for use in tailwind.config.ts
 * `cn` - classname merging function
 *
 * UPDATE 2024-Dec-27 19:59 - Clever but way too heavy. Commenting most out - keep
 * breakpoints & display classes for now
 * Initially, just for exporting `safelist` for Tailwind config - to include & allow for dynamic classnames
 * 2024-Dec-27 19:59
 * Exports a `safelist` array for tailwind.config.ts
 * To use in `tailwind.config.ts` of an implementing app - :
 *
 * import type { Config } from "tailwindcss";
//import {safelist} from 'pk-ts-fe-lib';
import {safelist} from "./node_modules/pk-ts-fe-lib/dist/esm/libs/tailwind-utils.js";
export default {
  content: [
    "./src/pages/ ** / *.{js,ts,jsx,tsx,mdx}",
    "./src/components/ ** / *.{js,ts,jsx,tsx,mdx}",
    "./src/app/ ** / *.{js,ts,jsx,tsx,mdx}",
    'node_modules/daisyui/dist/ ** / *.js',
    'node_modules/react-daisyui/dist/ ** / *.js',
    'node_modules/pk-ts-fe-lib/dist/ ** / *.js',
  ],
  safelist,
  daisyui: {
    themes: ["light"],
  },
  plugins: [require('daisyui')],
} satisfies Config;

 * import type { Config } from "tailwindcss";
//import {safelist} from 'pk-ts-fe-lib';
import {safelist} from "./node_modules/pk-ts-fe-lib/dist/esm/libs/tailwind-utils.js";
 */
import { type ClassValue } from 'clsx';
/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge.
 * Use with `cva` class-variance-authority
 * className={cn(buttonVariants({ variant, size, className }))}
 */
export declare function cn(...inputs: ClassValue[]): string;
export declare const cssColorNames: string[];
export declare const twIntensities: string[];
export declare const twColorable: string[];
export declare const twBreakpoints: string[];
export declare const twStates: string[];
export declare const twVariants: string[];
export declare const twDisplays: string[];
/**
 * Makes a regex for Tailwind config safelist 'pattern'
 * @param args - array of strings or string arrays
 * If arg is array, makes a regex for each array element
 * Combines all args separated by '-', and creates a regex
 * @returns - regex
 */
export declare function mkTwRegex(...args: any[]): RegExp;
export declare const safelist: {
    pattern: RegExp;
    variants: string[];
}[];
//# sourceMappingURL=tailwind-utils.d.ts.map