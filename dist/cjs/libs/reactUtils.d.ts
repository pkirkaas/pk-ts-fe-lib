/** Not components, but tweaks to support react */
import { GenObj } from 'pk-ts-common-lib';
export declare const origin: string;
export declare const apiUrl: string;
export declare let compCount: {
    cnt: number;
};
export declare function getCnt(): number;
export declare function getPage(): string;
export declare const page: string;
export declare function mkUrl(rel: any): string;
/**
 *  For functional components to modify props to pass subcomponent
 */
/**
 * Combine original and additional props - only for object or
 * string properties - if mods[key] is object, merges them,
 * if mods[key] is string, concatenates w. space (like for className)
 */
export declare function addProps(props: object, mods?: object): GenObj;
/**
 * Replaces any key-values in props with values from mods.
 * So, can override values passed in from props, BUT:
 * INTERESTINGLY! Can be used with arguments reversed to use defaults!
 * Like calling: replaceProps(defaults, props);
 */
export declare function replaceProps(props: object, mods?: any): GenObj;
//# sourceMappingURL=reactUtils.d.ts.map