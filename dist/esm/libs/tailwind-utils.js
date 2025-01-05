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
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merges Tailwind CSS classes using clsx and tailwind-merge.
 * Use with `cva` class-variance-authority
 * className={cn(buttonVariants({ variant, size, className }))}
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const cssColorNames = [
    "black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia",
    "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "gold",
];
export const twIntensities = [
    '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'
];
export const twColorable = [
    'bg', 'text', 'border',
];
export const twBreakpoints = [
    'sm', 'md', 'lg', 'xl', '2xl',
];
export const twStates = [
    'hover', 'focus', 'active', 'disabled', 'checked', 'default', 'required', 'valid', 'invalid', 'after', 'before',
    /*
    'group-hover', 'group-focus', 'group-active', 'dark', 'dark:hover', 'dark:focus', 'dark:active', 'dark:group-hover', 'dark:group-focus', 'dark:group-active', 'sm:hover', 'sm:focus', 'sm:active', 'sm:group-hover', 'sm:group-focus', 'sm:group-active', 'md:hover', 'md:focus', 'md:active', 'md:group-hover', 'md:group-focus', 'md:group-active', 'lg:hover', 'lg:focus', 'lg:active', 'lg:group-hover', 'lg:group-focus', 'lg:group-active', 'xl:hover', 'xl:focus', 'xl:active', 'xl:group-hover', 'xl:group-focus', 'xl:group-active', '2xl:hover', '2xl:focus', '2xl:active', '2xl:group-hover', '2xl:group-focus', '2xl:group-active', 'hover:hover',
    */
];
export const twVariants = [
    ...twBreakpoints,
    //...twStates,
];
export const twDisplays = [
    'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'hidden',
    //'grid', 'inline-grid', 'table', 'inline-table', 'table-row', 'table-row-group',
    //'table-header-group', 'table-footer-group', 'table-cell', 'table-column',
    //'table-column-group',  'contents', 'visible',
];
/**
 * Makes a regex for Tailwind config safelist 'pattern'
 * @param args - array of strings or string arrays
 * If arg is array, makes a regex for each array element
 * Combines all args separated by '-', and creates a regex
 * @returns - regex
 */
export function mkTwRegex(...args) {
    let parts = [];
    for (let arg of args) {
        if (Array.isArray(arg)) {
            parts.push(`(${arg.join('|')})`);
        }
        else if (typeof arg === "string") {
            parts.push(arg);
        }
        else {
            throw new Error(`Unhandled arg type: ${typeof arg}`);
        }
    }
    let retStr = parts.join('-');
    //  console.log(`mkTwRegex: ${retStr}; args:`,{args});
    return new RegExp(retStr);
}
let patterns = [
    //  mkTwRegex(twColorable, cssColorNames, twIntensities),
    mkTwRegex(twDisplays),
];
export const safelist = patterns.map(p => ({
    pattern: p,
    variants: twVariants,
}));
//# sourceMappingURL=tailwind-utils.js.map