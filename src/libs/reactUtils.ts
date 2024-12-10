
/** Not components, but tweaks to support react */

// NPM Packages
import axios from 'axios';
import _ from 'lodash';

// PKLib Imports
import { isEmpty, isObject, GenObj, typeOf, mergeAndConcat, } from 'pk-ts-common-lib';

// Local Imports

import {StyleBuilder, cxsb, csssb, } from './styleUtils.js';
//window.localStorage.setItem('JWTToken', 'MyTestToken');
//let jwtToken = window.localStorage.getItem('JWTToken',);

//console.log({ jwtToken });


export const origin = window?.location?.origin || '';
export const apiUrl = `${origin}/api`;


export let compCount = { cnt: 0 };
export function getCnt() {
	compCount.cnt++;
	//console.log(`NewCnt: [${compCount.cnt}]`);
	return compCount.cnt;
}

export * from './styleUtils.js';
export * from './styleUtils.js';



axios.defaults.baseURL = apiUrl;

export function getPage() {
	let path = window?.location?.pathname || '';
	return path;
}

export const page = getPage();


export function mkUrl(rel) {
	return `${apiUrl}/${rel}`;
}



/**
 *  For functional components to modify props to pass subcomponent
 */

//TODO: Are these useful? Do they work as intended?

/**
 * Combine original and additional props - only for object or
 * string properties - if mods[key] is object, merges them,
 * if mods[key] is string, concatenates w. space (like for className)
 * NOT deprecated - Not really - just verify this is useful and behaves as desired
 */
export function addProps(props: object, mods?: object): GenObj {
	if (isEmpty(mods)) {
		return props;
	}
	//let rProps = { ...props };
	if (!isObject(mods)) {
		throw new Error(`Invalid arg for mods in addProps - must be object`);
	}
	// Isn't this good enough? Except for concatenation of strings for classNames
	return mergeAndConcat(props, mods);

	/*

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
		if (isObject(mod) && isObject(prop)) {
			rProps[key] = _.mergeWith(prop,mod );
			continue;
		}
		console.error(`In addProps - what to do with prop & mod:`, { prop, mod });
	}
	return rProps;
	*/
}

/** Takes a "props" object, adds additional CSS Classnames/styling 
 *  TEST & VERIFY!
 * @param props:GenObj - a react component's props object
 * @param ...styleables:any - any number of CSS classnames, or style objects, or StyleBuilder instances, to be added to props.className
 * @returns props with className updated
 */
export function addClassNames(props:GenObj,...styleables):GenObj {
	let cprops = {...props};
	cprops.className = cxsb(props.className, ...styleables);
	return cprops;
}

/**
 * Replaces any key-values in props with values from mods.
 * So, can override values passed in from props, BUT:
 * INTERESTINGLY! Can be used with arguments reversed to use defaults!
 * Like calling: replaceProps(defaults, props);
 * NOT deprecated - Not really - just verify this is useful and behaves as desired
 */
export function replaceProps(props: object, mods?: any): GenObj {
	if (!isObject(mods) || isEmpty(mods)) {
		return { ...props };
	}

	return { ...props, ...mods };
}


