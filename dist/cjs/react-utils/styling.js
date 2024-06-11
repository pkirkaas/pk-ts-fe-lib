/**
 * CSS Styling support
 */
import { camelKeys, } from 'pk-ts-common-lib';
/**
 * Takes a style object or array of style objects and returns a new, flattened style obj
 * Since react "style" requires camelCase & styled_commponents require true CSS prop keys,
 * will convert as specified in 'toCammel'
 * @param styles:GenObj | GenObj[] - style objects to flatten
 * @param toCamel?: boolean = default true - else, snake
 */
export function flattenStyles(styles, toCamel = true) {
    if (!Array.isArray(styles)) {
        styles = [styles];
    }
    //@ts-ignore
    let flatStyles = Object.assign({}, ...styles);
    let cased = camelKeys(flatStyles);
    return cased;
}
//# sourceMappingURL=styling.js.map