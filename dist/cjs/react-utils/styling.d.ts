/**
 * CSS Styling support
 */
import { GenObj } from 'pk-ts-common-lib';
/**
 * Takes a style object or array of style objects and returns a new, flattened style obj
 * Since react "style" requires camelCase & styled_commponents require true CSS prop keys,
 * will convert as specified in 'toCammel'
 * @param styles:GenObj | GenObj[] - style objects to flatten
 * @param toCamel?: boolean = default true - else, snake
 */
export declare function flattenStyles(styles: GenObj | GenObj[], toCamel?: boolean): GenObj;
//# sourceMappingURL=styling.d.ts.map