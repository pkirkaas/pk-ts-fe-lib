/**
 * Initially, just for exporting `safelist` for Tailwind config - to include & allow for dynamic classnames
 * 2024-Dec-27 19:59
 * Exports a `safelist` array for tailwind.config.ts
 * To use:
 * 
 */

export const cssColorNames = [ //Just the basic colors
"black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia",
"green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "gold",
];

export const twIntensities = [ // color intensities
  '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'
];

export const twColorable = [ // CSS props that can be colorized - like text, border,
  'bg', 'text', 'border',
];

export const twBreakpoints  = [
  'sm', 'md', 'lg', 'xl', '2xl',
];


export const twStates = [ // states & pseudo-states/selectors/
   'hover', 'focus', 'active', 'disabled', 'checked', 'default', 'required', 'valid', 'invalid', 'after', 'before',
   
   
   /*
   'group-hover', 'group-focus', 'group-active', 'dark', 'dark:hover', 'dark:focus', 'dark:active', 'dark:group-hover', 'dark:group-focus', 'dark:group-active', 'sm:hover', 'sm:focus', 'sm:active', 'sm:group-hover', 'sm:group-focus', 'sm:group-active', 'md:hover', 'md:focus', 'md:active', 'md:group-hover', 'md:group-focus', 'md:group-active', 'lg:hover', 'lg:focus', 'lg:active', 'lg:group-hover', 'lg:group-focus', 'lg:group-active', 'xl:hover', 'xl:focus', 'xl:active', 'xl:group-hover', 'xl:group-focus', 'xl:group-active', '2xl:hover', '2xl:focus', '2xl:active', '2xl:group-hover', '2xl:group-focus', '2xl:group-active', 'hover:hover', 
   */
]; 

export const twVariants = [ // variants - different meaning for tw, stitches, etc.
  ...twBreakpoints, ...twStates,
];

export const twDisplays = [
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'table', 'inline-table', 'table-row', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-cell', 'table-column', 'table-column-group',  'contents', 'hidden', 'visible',
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
    } else if (typeof arg === "string") {
      parts.push(arg);
    } else {
      throw new Error(`Unhandled arg type: ${typeof arg}`);
    }
  }
  let retStr = parts.join('-');
//  console.log(`mkTwRegex: ${retStr}; args:`,{args});
  return new RegExp(retStr);
}

let patterns = [
  mkTwRegex(twColorable, cssColorNames, twIntensities),
  mkTwRegex(twDisplays),
];

export const safelist = patterns.map(p => ({
  pattern: p,
  variants: twVariants,
}));
























