/**
 * Initially, just for exporting `safelist` for Tailwind config - to include & allow for dynamic classnames
 * 2024-Dec-27 19:59
 * Exports a `safelist` array for tailwind.config.ts
 * To use:
 *
 */
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