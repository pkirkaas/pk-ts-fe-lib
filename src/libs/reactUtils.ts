/** Not components, but tweaks to support react */
import { isEmpty, isObject, GenObj, typeOf } from 'pk-ts-common-lib';

/**
 *  For functional components to modify props to pass subcomponent
 */

/**
 * Combine original and additional props - only for object or
 * string properties - if mods[key] is object, merges them,
 * if mods[key] is string, concatenates w. space (like for className)
 */
export function addProps(props: object, mods?: object): object {
	let rProps = { ...props };
	if (!isEmpty(mods)) {
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
			if (isObject(mod) && isObject(prop)) {
				rProps[key] = { ...prop, ...mod };
			} else if ((typeof mod === 'string') && (typeof prop === 'string')) {
				rProps[key] = `${prop} ${mod}`;
			}
		}
	}
	return rProps;
}

export function replaceProps(props: object, mods?: any): object {
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
}


