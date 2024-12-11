import { GenObj } from 'pk-ts-common-lib';
export declare const origin: string;
export declare const apiUrl: string;
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
 * NOT deprecated - Not really - just verify this is useful and behaves as desired
 */
export declare function addProps(props: object, mods?: object): GenObj;
/** Takes a "props" object, adds additional CSS Classnames/styling
 *  TEST & VERIFY!
 * @param props:GenObj - a react component's props object
 * @param ...styleables:any - any number of CSS classnames, or style objects, or StyleBuilder instances, to be added to props.className
 * @returns props with className updated
 */
export declare function addClassNames(props: GenObj, ...styleables: any[]): GenObj;
/**
 * Replaces any key-values in props with values from mods.
 * So, can override values passed in from props, BUT:
 * INTERESTINGLY! Can be used with arguments reversed to use defaults!
 * Like calling: replaceProps(defaults, props);
 * NOT deprecated - Not really - just verify this is useful and behaves as desired
 */
export declare function replaceProps(props: object, mods?: any): GenObj;
//# sourceMappingURL=reactUtils.d.ts.map