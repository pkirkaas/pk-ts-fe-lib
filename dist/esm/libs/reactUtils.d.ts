/**
 *  For functional components to modify props to pass subcomponent
 */
/**
 * Combine original and additional props - only for object or
 * string properties - if mods[key] is object, merges them,
 * if mods[key] is string, concatenates w. space (like for className)
 */
export declare function addProps(props: object, mods?: object): object;
export declare function replaceProps(props: object, mods?: any): object;
//# sourceMappingURL=reactUtils.d.ts.map