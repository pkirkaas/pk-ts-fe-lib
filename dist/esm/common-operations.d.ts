import urlStatus from 'url-status-code';
import JSON5 from 'json5';
import { GenericObject, GenObj } from './index.js';
export { urlStatus, JSON5, GenericObject, GenObj };
/** NODE SPECIFIC
*/
/**
 * Returns stack trace as array
 * Error().stack returns a string. Convert to array
 * @param offset - optional - how many levels shift off
 * the top of the array
 * @retrun array stack
 */
export declare function getStack(offset?: number): any[];
/**
 * Return just the subset of the object, for keys specified in the "fields" array.
 */
export declare function subObj(obj: GenericObject, fields: string[]): GenObj;
/** Takes a 'duration' object for date-fns/add and validate
 * it. Optionall, converts to negative (time/dates in past)
 * @param obj object - obj to test
 * @param boolean forceNegative - force to negative/past offest?
 * @return duration
 */
export declare function validateDateFnsDuration(obj: any, forceNegative?: boolean): any;
/**
 * Returns true if arg str contains ANY of the what strings
 */
export declare function strIncludesAny(str: string, substrs: any): boolean;
export declare function isPromise(arg?: any): boolean;
/** From Mozilla - a stricter int parser */
export declare function filterInt(value: any): number | false;
/**
 * Takes a browser event & tries to get some info
 * Move this to browser library when the time comes
 */
export declare function eventInfo(ev: any): {};
export declare function JSON5Parse(str: string): any;
/** Try to make simple copies of complex objects (like with cyclic references)
 * to be storable in MongoDB
 * Primitives will just be returned unchanged.
 */
export declare function jsonClone(arg: any): any;
/**
 * Checks if the arg can be converted to a number
 * If not, returns boolean false
 * If is numeric:
 *   returns boolean true if asNum is false
 *   else returns the numeric value (which could be 0)
 * @param asNum boolean - if true,
 *
 */
export declare function isNumeric(arg: any, asNum?: boolean): number | boolean;
/**
 * Returns the numeric value, or boolean false
 */
export declare function asNumeric(arg: any): number | boolean;
/**
 * If arg can be in any way be interpreted as a date,
 * returns the JS Date object,
 * NOTE: Unlike regulare JS :
 *
 * let dtE = new Date(); //Now
 * let dtN = new Date(null); //Start of epoch
 * Valid arg values:
 *    null - returns new Date() - now
 *    new Date("2016-01-01")
 *   "2016-01-01"
 *    1650566202871
 *   "1650566202871"
 *   "2022-04-21T18:36:42.871Z"
 * Returns a valid JS Date object or false
 * -- Why not just 'new Date(arg)'??
 * Because: new Date(1650566202871) works
 * BUT new Date("1650566202871") DOESN'T - and sometimes
 * the DB returns a timestamp as a string...
 */
export declare function pkToDate(arg: any): false | Date;
/**
 * Quick Format a date with single format code & date
 * @param string fmt - one of an array
 * @param dt - datable or if null now  - but - if invalid, though returns false
 */
export declare function dtFmt(fmt?: any, dt?: any): string;
/**
 * Return elements in arr1 Not In arr2
 */
export declare function inArr1NinArr2(arr1: any[], arr2: any[]): any[];
/**
 * Uniqe intersection of two arrays
 */
export declare function intersect(a?: any[], b?: any[]): any[];
/**
 * Compares arrays by VALUES - independant of order
 */
export declare function arraysEqual(a: any, b: any): boolean;
/**
 * Is 'a' a subset of 'b' ?
 */
export declare function isSubset(a: any, b: any): any;
export declare function isCli(report?: boolean): boolean;
export declare function rewriteHttpsToHttp(url: any): string;
/**
 * check single url or array of urls
 * if single url, return true/false
 * if array, return array of failed urls
 * TODO!! Doesn't accout for network errors, exceptions, etc!!
 * SEE below checkUrl3
 */
export declare function checkUrl(url: any): Promise<boolean | any[]>;
export declare function checkUrlAxios(tstUrl: any, full?: boolean): Promise<any>;
/**
 * Tri-state check - to account for failed checks -
 * @return boolean|other
 * If "true" - good URL
 * If "false" - 404 or something - but GOT A STATUS!
 * IF other - who knows? bad domain, invalid URL, network error,...
 *
 *
 */
export declare function checkUrl3(url: any): Promise<any>;
/**
 * This is a tough call & really hard to get right...
 */
export declare function isEmpty(arg: any): boolean;
/**
 * returns arg, unless it is an empty object or array
 */
export declare function trueVal(arg: any): any;
/**
 * Arrays & Objects passed by referrence,
 * risk of unintended changes
 */
export declare function isByRef(arg: any): boolean;
export declare function isSimpleType(arg: any): boolean;
export declare function isPrimitive(arg: any): boolean;
/**
 * Tests if the argument is a "simple" JS object - with just keys
 * & values, not based on other types or prototypes
 */
export declare function isSimpleObject(anobj: any): boolean;
export declare function isObject(arg: any, alsoEmpty?: boolean, alsoFunction?: boolean): boolean;
export declare function getConstructorChain(obj: any): any[];
/**
 * Checks if arg is an instance of a class.
 * TODO: - have to do lots of testing of different args to
 * verify test conditions...
 * @return - false, or {constructor, className}
 */
export declare function isInstance(arg: any): false | {
    constructor: any;
    className: any;
};
/**
 * Appears to be no way to distinguish between a to-level class
 * and a function...
 */
export declare function isClassOrFunction(arg: any): any;
/**
 * Check whether obj is an instance or a class
 */
export declare function classStack(obj: any): any[];
/**
 * This is very hacky - but can be helpful - to get the inheritance
 * chain of classes & instances of classes - lots of bad edge cases -
 * BE WARNED!
 */
export declare function getPrototypeChain(obj: any): any[];
export declare function getObjDets(obj: any): false | {
    toObj: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    pkToObj: String;
    props: string | boolean | GenObj | [];
    prototype: any;
};
/**
 * Not complete, but want to be careful...
 * Leave Math out - because it is not a class or constructor...
 */
export declare const jsBuiltInObjMap: {
    Object: ObjectConstructor;
    Array: ArrayConstructor;
    Date: DateConstructor;
    Number: NumberConstructor;
    String: StringConstructor;
    Function: FunctionConstructor;
};
export declare const jsBuiltIns: (DateConstructor | NumberConstructor | StringConstructor | ObjectConstructor | ArrayConstructor | FunctionConstructor)[];
export declare function getAllBuiltInProps(): any[];
/**
 * As an exclude list for filtering out props from specific objects, but
 * HAVE TO BE CAREFUL! - Somethings we don't want to exclude, like constructor,
 * name, etc...
 * APPROXIMATELY:
 *  [ 'length', 'name', 'prototype', 'assign', 'getOwnPropertyDescriptor',
    'getOwnPropertyDescriptors', 'getOwnPropertyNames', 'getOwnPropertySymbols',
    'is', 'preventExtensions', 'seal', 'create', 'defineProperties', 'defineProperty', 'freeze', 'getPrototypeOf', 'setPrototypeOf', 'isExtensible', 'isFrozen', 'isSealed', 'keys', 'entries', 'fromEntries',
    'values', 'hasOwn', 'arguments', 'caller', 'constructor', 'apply',
    'bind', 'call', 'toString', '__defineGetter__', '__defineSetter__',
    'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf',
    'propertyIsEnumerable', 'valueOf', '__proto__', 'toLocaleString',
    'isArray', 'from', 'of', 'now', 'parse', 'UTC', 'isFinite', 'isInteger',
    'isNaN', 'isSafeInteger', 'parseFloat', 'parseInt', 'MAX_VALUE',
    'MIN_VALUE', 'NaN', 'NEGATIVE_INFINITY', 'POSITIVE_INFINITY', 'MAX_SAFE_INTEGER', 'MIN_SAFE_INTEGER', 'EPSILON', 'fromCharCode',
    'fromCodePoint', 'raw', ],
 */
export declare const builtInProps: any[];
/**
 * Any point to decompose this with allProps?
 */
export declare function isParsable(arg: any): boolean;
export declare function isParsed(arg: any): any;
/**
 * Returns property names from prototype tree. Even works for primitives,
 * but not for null - so catch the exception & return []
 */
export declare function getProps(obj: any): any[];
/**
 * Weirdly, most built-ins have a name property, & are of type [Function:Date]
 * or whatever, but Math does NOT have a name property, and is of type "Object [Math]". So try to deal with that...
 */
export declare function builtInName(bi: any): string;
/**
 * Returns false if arg is NOT a built-in - like Object, Array, etc,
 * OR - the built-in Name as string.
 */
export declare function isBuiltIn(arg: any): string | false;
export declare const keepProps: string[];
export declare function filterProps(props: any[]): any[];
/**
 * Inspect an object to get as many props as possible,
 * optionally with values, types, or both - optionally filterd
 * by props
 * @param obj - what to test
 * // @param depth number - what to return
 * //0: just array of prop keys
 * //1: object of keys=>value
 * //2: object of keys => {type, value}
 * @param string opt any or all of: v|t|p|f
 * If 'v' - the raw value
 * If 'p' - a parsed, readable value
 * If 't' - the value type

 * If none of t,v, or p  just array of props

 * If at least one of t,v,p, abject {prop:{value,type,parsed}

 * If f - FULL property details. Default: filter out uninteresting props
 *
 * @param int depth - how many levels should it go?
 */
export declare function allProps(obj: any, opt?: string, depth?: number): GenObj | [] | string | boolean;
export declare function allPropsWithTypes(obj: any): string | boolean | GenObj | [];
export declare function objInfo(arg: any, opt?: string): GenObj;
/**
 * Take input arrays, merge, & return single array w. unique values
 */
export declare function uniqueVals(...arrs: any[]): any[];
export declare function typeOf(anObj: any, opts?: any): String;
/**
 * Replace w. below when finished.
 */
export declare function getRand(arr: any[]): any;
/**
 * Gets cnt random unique elements of an array
 * Not the most efficient but it works
 * if cnt = 0, returns a single element, else an array of els
 */
export declare function getRandEls(arr: any[], cnt?: any): any;
/**
*/
/**
 * Retuns a random integer
 * @param numeric to - max int to return
 * @param numberic from default 0 - optional starting/min number
 * @return int
 */
export declare function randInt(to: any, from?: any): any;
/**
 * Lazy way to get type of multiple variables at once
 * @param simple object obj - collection of properties to type
 * @return object - keyed by the original keys, to type
 */
export declare function typeOfEach(obj: any): any;
export declare function valWithType(val: any): any;
/** Safe stringify - try first, then acycling */
export declare function JSON5Stringify(arg: any): any;
export declare function JSONStringify(arg: any): any;
/** Totally lifted from Axios - but they don't export it!
 * Takes an HTTP header string and objectifies it -
 * directives as keys
 * with values or undefined
 * @return object
 */
export declare function parseHeaderString(str: any): any;
/**
 * stupid name - but just removes all quotes, spaces, etc
 * from a string.
 */
export declare function stripStray(str?: any): any;
/** For attributes, etc, as valid JS variable.
 * BONUS: Strips any extraneous quotes, etc.
 * @return string - camelCased
 */
export declare function toCamelCase(str?: any): any;
export declare function toSnakeCase(str?: any): any;
//# sourceMappingURL=common-operations.d.ts.map