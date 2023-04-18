/**
 * Experimental implementation of specialized object utilities - like deep merge, with arrays combined
 * March 2023
 * Paul Kirkaas
 *
 */
import { uniqueVals, PkError, isObject, isPrimitive, typeOf } from './index.js';
export function deepMeld(...objs) {
    let melded = {};
    for (let obj of objs) {
        if (!isObject(obj)) {
            let too = typeOf(obj);
            let msg = `Argument to deepMeld is not an object: Type: [${too}]`;
            throw new PkError(msg, { obj });
        }
        for (let key in obj) {
            let val = obj[key];
            if (!(key in melded) || isPrimitive(val)) {
                melded[key] = val;
                continue;
            }
            let mval = melded[key]; // How to meld depending on type
            if (Array.isArray(val) && Array.isArray(mval)) {
                melded[key] = uniqueVals(mval, val);
                continue;
            }
            if (isObject(val) && isObject(mval)) {
                melded[key] = deepMeld(mval, val);
                continue;
            }
            melded[key] = val;
        }
    }
    return melded;
}
//# sourceMappingURL=object-utils.js.map