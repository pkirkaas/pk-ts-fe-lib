/** Not components, but tweaks to support react */
import { isEmpty, isObject } from 'pk-ts-common-lib';
//window.localStorage.setItem('JWTToken', 'MyTestToken');
let jwtToken = window.localStorage.getItem('JWTToken');
console.log({ jwtToken });
import axios from 'axios';
export const origin = window.location.origin;
export const apiUrl = `${origin}/api`;
export let compCount = { cnt: 0 };
export function getCnt() {
    compCount.cnt++;
    //console.log(`NewCnt: [${compCount.cnt}]`);
    return compCount.cnt;
}
axios.defaults.baseURL = apiUrl;
export function getPage() {
    let path = window.location.pathname;
    return path;
}
export const page = getPage();
export function mkUrl(rel) {
    return `${apiUrl}/${rel}`;
}
/**
 *  For functional components to modify props to pass subcomponent
 */
/**
 * Combine original and additional props - only for object or
 * string properties - if mods[key] is object, merges them,
 * if mods[key] is string, concatenates w. space (like for className)
 */
export function addProps(props, mods) {
    let rProps = { ...props };
    if (isEmpty(mods)) {
        return rProps;
    }
    if (!isObject(mods)) {
        throw new Error(`Invalid arg for mods in addProps - must be object`);
    }
    for (let key in mods) {
        let prop = rProps[key];
        let mod = mods[key];
        if (!prop) {
            rProps[key] = mod;
            continue;
        }
        if (!mod) {
            continue;
        }
        if ((Array.isArray(prop) && Array.isArray(mod)) ||
            (isObject(mod) && isObject(prop))) {
            rProps[key] = { ...prop, ...mod };
            continue;
        }
        if ((typeof mod === 'string') && (typeof prop === 'string')) {
            rProps[key] = `${prop} ${mod}`;
            continue;
        }
        console.error(`In addProps - what to do with prop & mod:`, { prop, mod });
    }
    return rProps;
}
/**
 * Replaces any key-values in props with values from mods.
 * So, can override values passed in from props, BUT:
 * INTERESTINGLY! Can be used with arguments reversed to use defaults!
 * Like calling: replaceProps(defaults, props);
 */
export function replaceProps(props, mods) {
    if (!isObject(mods) || isEmpty(mods)) {
        return { ...props };
    }
    return { ...props, ...mods };
    /*
    let rProps = { ...props };
    if (!isEmpty(mods)) {
        if (!isObject(mods)) {
            throw new Error(`Invalid arg for mods in addProps - must be object`);
        }
        for (let key in mods) {
            let mod = mods[key];
            rProps[key] = mod;
        }
    }
    return rProps;
    */
}
//# sourceMappingURL=reactUtils.js.map