var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const urlStatus = require('url-status-code');
import urlStatus from 'url-status-code';
import JSON5 from 'json5';
//const JSON5 = require('json5');
//linked?
//const _ = require("lodash");
import _ from "lodash";
import { PkError } from './index.js';
//@ts-ignore
//import jsondecycle from "json-decycle";
//import { jsondecycle } from "./lib/json-decycle.js";
import { extend } from "./lib/json-decycle.js";
//export { jsondecycle };
//decycle, retrocycle, extend
//@ts-ignore
extend(JSON5);
//const axios = require("axios");
//import { axios } from "Axios";
import axios from "axios";
import { format, isValid } from "date-fns";
export { urlStatus, JSON5 };
//const path = require("path/posix");
//const path = require("path/posix");
/** NODE SPECIFIC
*/
/**
 * Returns stack trace as array
 * Error().stack returns a string. Convert to array
 * @param offset - optional - how many levels shift off
 * the top of the array
 * @retrun array stack
 */
export function getStack(offset = 0) {
    offset += 2;
    let stackStr = Error().stack;
    let stackArr = stackStr.split("at ");
    //console.log({ stackArr });
    stackArr = stackArr.slice(offset);
    let ret = [];
    for (let row of stackArr) {
        ret.push(row.trim());
    }
    return ret;
}
/**
 * Return just the subset of the object, for keys specified in the "fields" array.
 */
export function subObj(obj, fields) {
    let ret = {};
    for (let field of fields) {
        ret[field] = obj[field];
    }
    return ret;
}
/** Takes a 'duration' object for date-fns/add and validate
 * it. Optionall, converts to negative (time/dates in past)
 * @param obj object - obj to test
 * @param boolean forceNegative - force to negative/past offest?
 * @return duration
 */
export function validateDateFnsDuration(obj, forceNegative = false) {
    if (!isSimpleObject(obj) || isEmpty(obj)) {
        return false;
    }
    let dfnsKeys = [`years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`,];
    /*
    let objKeys = Object.keys(obj);
    let ret: any = {};
    */
    for (let key in obj) {
        if (!dfnsKeys.includes(key)) {
            return false;
        }
        if (forceNegative) {
            obj[key] = -Math.abs(obj[key]);
        }
        return obj;
    }
}
/**
 * Returns true if arg str contains ANY of the what strings
 */
export function strIncludesAny(str, substrs) {
    if (!Array.isArray(substrs)) {
        substrs = [substrs];
    }
    for (let substr of substrs) {
        if (str.includes(substr)) {
            return true;
        }
    }
    return false;
}
export function isPromise(arg) {
    return !!arg && typeof arg === "object" && typeof arg.then === "function";
}
/** From Mozilla - a stricter int parser */
export function filterInt(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
    }
    else {
        //return NaN
        return false;
    }
}
/*
export function getEspStack() {
  let stack = ESP.parse(new Error());
  return stack;
}
*/
/**
 * Takes a browser event & tries to get some info
 * Move this to browser library when the time comes
 */
export function eventInfo(ev) {
    let evProps = ['bubbles', 'cancelable', 'cancelBubble', 'composed', 'currentTarget',
        'defaultPrevented', 'eventPhase', 'explicitOriginalTarget', 'isTrusted',
        'originalTarget', 'returnValue', 'srcElement', 'target',
        'timeStamp', 'type',];
    let eventDets = {};
    for (let prop of evProps) {
        eventDets[prop] = jsonClone(ev[prop]);
    }
    return eventDets;
}
export function JSON5Parse(str) {
    try {
        return JSON5.parse(str);
    }
    catch (e) {
        let eInfo = objInfo(e);
        return {
            json5ParseError: e,
            eInfo,
            origStr: str,
        };
    }
}
/** Try to make simple copies of complex objects (like with cyclic references)
 * to be storable in MongoDB
 * Primitives will just be returned unchanged.
 */
export function jsonClone(arg) {
    if (!arg || typeof arg !== "object" || isPrimitive(arg)) {
        return arg;
    }
    //@ts-ignore
    if ((typeof Element !== 'undefined') && (arg instanceof Element)) {
        //Not sure I want to do this - my JSON5Stringify might handle it - test in browser
        return arg.outerHTML;
    }
    //return JSON5.parse(JSON5Stringify(arg));
    return JSON5Parse(JSON5Stringify(arg));
}
/**
 * Checks if the arg can be converted to a number
 * If not, returns boolean false
 * If is numeric:
 *   returns boolean true if asNum is false
 *   else returns the numeric value (which could be 0)
 * @param asNum boolean - if true,
 *
 */
export function isNumeric(arg, asNum = false) {
    let num = Number(arg);
    if (num !== parseFloat(arg)) {
        return false;
    }
    if (asNum) {
        return num;
    }
    return true;
}
/**
 * Returns the numeric value, or boolean false
 */
export function asNumeric(arg) {
    return isNumeric(arg, true);
}
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
export function pkToDate(arg) {
    if (isNumeric(arg)) {
        arg = new Date(Number(arg));
    }
    else if (isEmpty(arg)) {
        arg = new Date();
    }
    else {
        arg = new Date(arg);
    }
    if ((arg instanceof Date) && isValid(arg)) {
        return arg;
    }
    return false;
}
/**
 * Quick Format a date with single format code & date
 * @param string fmt - one of an array
 * @param dt - datable or if null now  - but - if invalid, though returns false
 */
export function dtFmt(fmt, dt) {
    let fmts = {
        short: 'dd-MMM-yy',
        dt: 'dd-MMM-yy KK:mm',
        dts: 'dd-MMM-yy KK:mm:ss',
        ts: 'KK:mm:ss',
    };
    let keys = Object.keys(fmts);
    if (!keys.includes(fmt)) {
        fmt = 'short';
    }
    dt = pkToDate(dt);
    if (dt === false) {
        return "FALSE";
    }
    let fullFmt = fmts[fmt];
    return format(dt, fullFmt);
}
//Array utilities
/**
 * Return elements in arr1 Not In arr2
 */
export function inArr1NinArr2(arr1, arr2) {
    return arr1.filter((el) => !arr2.includes(el));
}
/**
 * Uniqe intersection of two arrays
 */
export function intersect(a, b) {
    var setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
}
/**
 * Compares arrays by VALUES - independant of order
 */
export function arraysEqual(a, b) {
    return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
}
/**
 * Is 'a' a subset of 'b' ?
 */
export function isSubset(a, b) {
    a = [...new Set(a)];
    b = [...new Set(b)];
    return a.every((val) => b.includes(val));
}
//TODO - REDO! This sucks...
export function isCli(report = false) {
    let runtime = process.env.RUNTIME;
    //let runtime = getRuntime();
    let lisCli = runtime === "cli";
    if (!lisCli && report) {
        console.error("WARNING - calling a CLI-ONLY function in a non-cli runtime:", { runtime });
    }
    console.log("In isCli; runtime:", { runtime, lisCli });
    return lisCli;
}
export function rewriteHttpsToHttp(url) {
    let parts = url.split(":");
    if (parts[0] === "https") {
        parts[0] = "http";
    }
    let newUrl = `${parts[0]}:${parts[1]}`;
    return newUrl;
}
/**
 * check single url or array of urls
 * if single url, return true/false
 * if array, return array of failed urls
 * TODO!! Doesn't accout for network errors, exceptions, etc!!
 * SEE below checkUrl3
 */
export function checkUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(url)) {
            let badUrls = [];
            for (let aurl of url) {
                let status = yield urlStatus(aurl);
                if (status != 200) {
                    badUrls.push(aurl);
                }
            }
            if (!badUrls.length) {
                return true;
            }
            return badUrls;
        }
        else {
            let status = yield urlStatus(url);
            if (status == 200) {
                return true;
            }
            return false;
        }
    });
}
function mkUrl(url) {
    try {
        let urlObj = new URL(url);
        return urlObj;
    }
    catch (err) {
        //console.error({ url, err });
        if ((typeof err === 'object') && (err.code)) {
            return err.code;
        }
        return err;
    }
}
//Same as above, but 
function mkUrlObj(url, full = false) {
    try {
        let urlObj = new URL(url);
        return urlObj;
    }
    catch (err) {
        if (full) {
            return err;
        }
        //console.error({ url, err });
        if ((typeof err === 'object') && (err.code)) {
            return err.code;
        }
        return err;
    }
}
export function checkUrlAxios(tstUrl, full = false) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        //let lTool = new LogTool({context: 'checkUrlStatus'});
        //  let lTool = LogTool.getLog('chkStatA', { context: 'checkUrlAxios' });
        let failCodes = [404, 401, 403, 404]; // Return immediate false
        let retryCodes = [408, 429,]; // Try again
        let notAllowed = 405;
        /*
        let fOpts:GenObj = {
          method: "HEAD",
          cache: "no-cache",
          headers: {
          },
          connection: "close",
        };
        */
        let fOpts = {
            method: "HEAD",
            cache: "no-cache",
            headers: {
                Connection: 'close',
            },
            connection: "close",
        };
        let retries = 0;
        let maxRetries = 4;
        let timeout = 5;
        let urlObj = mkUrlObj(tstUrl, full);
        if (!(urlObj instanceof URL)) {
            if (full) {
                return urlObj;
            }
            return { err: tstUrl };
        }
        fOpts.url = tstUrl;
        let resps = [];
        let resp;
        let lastErr;
        try {
            while (retries < maxRetries) {
                retries++;
                lastErr = null;
                //@ts-ignore
                try {
                    resp = yield axios(fOpts);
                }
                catch (err) {
                    lastErr = err;
                    continue;
                }
                let status = resp.status;
                if (status === notAllowed) {
                    fOpts.method = "GET";
                    //@ts-ignore
                    resp = yield axios(fOpts);
                    status = resp.status;
                }
                if (status === 200) {
                    return true;
                }
                else if (failCodes.includes(status)) {
                    return false;
                }
                else if (retryCodes.includes(status)) {
                    continue;
                }
            } // Unknown reason for failure
            if (resp) {
                let respKeys = Object.keys(resp);
                let status = resp.status;
                let toResp = typeOf(resp);
                resp['retries'] = retries;
                let barg = { badresponse: { tstUrl, respKeys, status, toResp, resp } };
                //lTool.snap(barg);
                if (full) {
                    return resp;
                }
                return `code: [${resp.code}]; url: [${tstUrl}], status: [${resp.status}], retries: [${retries}]`;
            }
            else if (lastErr) { //Axios error!
                let toErr = typeOf(lastErr);
                let errKeys = Object.keys(lastErr);
                let sarg = { exception: { toErr, errKeys, lastErr, retries, tstUrl } };
                //lTool.snap({ err, retries, tstUrl });
                // console.log({ sarg });
                //lTool.snap(sarg);
                if (full) {
                    return lastErr;
                }
                let ret;
                if (typeof lastErr === 'object') {
                    (_a = lastErr === null || lastErr === void 0 ? void 0 : lastErr.cause) === null || _a === void 0 ? void 0 : _a.code;
                }
                if (!ret) {
                    ret = lastErr;
                }
                return ret;
            }
            let ret = {
                unkown: { retries, tstUrl, msg: "No error and no response?" }
            };
            //lTool.snap(ret);
            return ret;
            //console.log({ resp, respKeys });
            //console.log({  toResp, status, respKeys });
        }
        catch (err) {
            console.error("WE SHOULDN'T BE HERE!!", err);
            let toErr = typeOf(err);
            let errKeys = Object.keys(err);
            let sarg = { UnexpecteException: { toErr, errKeys, err, retries, tstUrl } };
            //lTool.snap({ err, retries, tstUrl });
            // console.log({ sarg });
            //lTool.snap(sarg);
            if (full) {
                return err;
            }
            let ret;
            if (typeof err === 'object') {
                (_b = err === null || err === void 0 ? void 0 : err.cause) === null || _b === void 0 ? void 0 : _b.code;
            }
            if (!ret) {
                ret = err;
            }
            return ret;
        }
    });
}
/**
 * Tri-state check - to account for failed checks -
 * @return boolean|other
 * If "true" - good URL
 * If "false" - 404 or something - but GOT A STATUS!
 * IF other - who knows? bad domain, invalid URL, network error,...
 *
 *
 */
export function checkUrl3(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let status = yield urlStatus(url);
            //let toS = typeOf(status);
            //console.log(`checkUrl3 - toS: ${toS}; status:`, { status });
            if (status == 200) {
                return true;
            }
            else if (status > 300) {
                return false;
            }
            return status;
        }
        catch (err) {
            return { msg: `Exception for URL:`, url, err };
        }
    });
}
/**
 * This is a tough call & really hard to get right...
 */
export function isEmpty(arg) {
    if (!arg || (Array.isArray(arg) && !arg.length)) {
        return true;
    }
    let toarg = typeof arg;
    if (toarg === "object") {
        let props = getProps(arg);
        let keys = Object.keys(arg);
        let aninb = inArr1NinArr2(props, builtInProps);
        //console.log({ props, keys,  aninb });
        if (!keys.length && !aninb.length) {
            return true;
        }
    }
    if (toarg === 'function') {
        return false;
    }
    //console.error(`in isEmpty - returning false for:`, { arg });
    return false;
}
/**
 * returns arg, unless it is an empty object or array
 */
export function trueVal(arg) {
    if (!isEmpty(arg)) {
        return arg;
    }
}
/**
 * Arrays & Objects passed by referrence,
 * risk of unintended changes
 */
export function isByRef(arg) {
    return !isPrimitive(arg);
}
export function isSimpleType(arg) {
    let simpletypes = ["boolean", "number", "bigint", "string"];
    let toarg = typeof arg;
    return simpletypes.includes(toarg);
}
export function isPrimitive(arg) {
    return arg !== Object(arg);
}
/**
 * Tests if the argument is a "simple" JS object - with just keys
 * & values, not based on other types or prototypes
 */
export function isSimpleObject(anobj) {
    if (!anobj || typeof anobj !== "object") {
        return false;
    }
    return Object.getPrototypeOf(anobj) === Object.getPrototypeOf({});
}
export function isObject(arg, alsoEmpty = false, alsoFunction = true) {
    //if (!arg || isPrimitive(arg) || isEmpty(arg)) {
    if (!arg || isPrimitive(arg) || (isEmpty(arg) && !alsoEmpty)) {
        return false;
    }
    if (alsoFunction && (typeof arg === 'function')) {
        return true;
    }
    return _.isObjectLike(arg);
}
/*
function probeProps(obj, props?: any[],) {
  let def = ['constructor', 'prototype','name','class', 'type','super',];
  let ret: GenObj = {};
  for (let prop of def) {
    try {
      let val = obj[prop];
      if ( val === undefined) {
        continue;
      }
      ret[prop] = { val, type: typeOf(val) };
    } catch (e) {
      console.error(`error in probeProps with prop [${prop}]`, e, obj);
    }
  }
  return ret;
}
 */
export function getConstructorChain(obj) {
    let i = 0;
    let constructorChain = [];
    let constructor = obj;
    try {
        while (constructor = constructor.constructor) {
            let toConstructor = typeOf(constructor);
            if ((i++ > 10) || (toConstructor === 'function: Function')) {
                break;
            }
            constructorChain.push({ constructor, toConstructor });
        }
    }
    catch (e) {
        console.error(`Exception w. in getConstructorChain:`, { obj, e });
    }
    return constructorChain;
}
/**
 * Checks if arg is an instance of a class.
 * TODO: - have to do lots of testing of different args to
 * verify test conditions...
 * @return - false, or {constructor, className}
 */
export function isInstance(arg) {
    if (isPrimitive(arg) || !isObject(arg) || isEmpty(arg)) {
        return false;
    }
    try {
        let constructor = arg === null || arg === void 0 ? void 0 : arg.constructor;
        if (constructor) {
            let className = constructor === null || constructor === void 0 ? void 0 : constructor.name;
            return { constructor, className };
        }
    }
    catch (e) {
        new PkError(`Exception:`, { e, arg });
    }
    return false;
}
/**
 * Appears to be no way to distinguish between a to-level class
 * and a function...
 */
export function isClassOrFunction(arg) {
    /*
    if ((typeof arg !== 'function') ||
      isPrimitive(arg) || !isObject(arg) || isEmpty(arg)) {
      return false;
    }
    */
    if ((typeof arg === 'function')) {
        try {
            let prototype = Object.getPrototypeOf(arg);
            return prototype;
        }
        catch (e) {
            new PkError(`Exception:`, { e, arg });
        }
    }
    return false;
}
/**
 * Check whether obj is an instance or a class
 */
export function classStack(obj) {
    let tst = obj;
    let stack = [];
    let deref = 'prototypeConstructorName';
    if (!isInstance(obj)) {
        //tst = Object.getPrototypeOf(obj);
        deref = 'prototypeName';
    }
    try {
        let pchain = getPrototypeChain(tst);
        stack = uniqueVals(pchain.map((e) => e[deref]));
        stack = stack.filter((e) => e !== '');
    }
    catch (e) {
        new PkError(`Exception:`, { obj, e, stack });
    }
    return stack;
}
/**
 * This is very hacky - but can be helpful - to get the inheritance
 * chain of classes & instances of classes - lots of bad edge cases -
 * BE WARNED!
 */
export function getPrototypeChain(obj) {
    var _a, _b;
    if (!obj) {
        return [];
    }
    let i = 0;
    let prototype = obj;
    let prototypeConstructor = prototype === null || prototype === void 0 ? void 0 : prototype.constructor;
    let prototypeConstructorName = (_a = prototype === null || prototype === void 0 ? void 0 : prototype.constructor) === null || _a === void 0 ? void 0 : _a.name;
    let toPrototype = typeOf(prototype);
    let prototypeName = prototype === null || prototype === void 0 ? void 0 : prototype.name;
    let toPrototypeConstructor = typeOf(prototypeConstructor);
    let prototypeChain = [{ prototype, prototypeName, prototypeConstructorName, toPrototype, prototypeConstructor, toPrototypeConstructor, }];
    try {
        while (prototype = Object.getPrototypeOf(prototype)) {
            //if ((i++ > 20) || isEmpty(prototype)) {
            if ((i++ > 20) || _.isEqual(prototype, {})) {
                //if ((i++ > 20) ) {
                break;
            }
            toPrototype = typeOf(prototype);
            prototypeConstructorName = (_b = prototype === null || prototype === void 0 ? void 0 : prototype.constructor) === null || _b === void 0 ? void 0 : _b.name;
            prototypeConstructor = prototype === null || prototype === void 0 ? void 0 : prototype.constructor;
            prototypeName = prototype === null || prototype === void 0 ? void 0 : prototype.name;
            toPrototypeConstructor = typeOf(prototypeConstructor);
            prototypeChain.push({ prototype, prototypeName, toPrototype, prototypeConstructorName, prototypeConstructor, toPrototypeConstructor, });
        }
    }
    catch (e) {
        console.error(`Exception w. in getPrototypeChain:`, { obj, e });
    }
    return prototypeChain;
}
export function getObjDets(obj) {
    if (!obj || isPrimitive(obj) || !isObject(obj)) {
        return false;
    }
    let toObj = typeof obj;
    let pkToObj = typeOf(obj);
    let props = allProps(obj, 'vtp');
    let prototype = Object.getPrototypeOf(obj);
    let ret = { toObj, pkToObj, props, prototype, };
    return ret;
}
/**
 * Not complete, but want to be careful...
 * Leave Math out - because it is not a class or constructor...
 */
export const jsBuiltInObjMap = {
    Object, Array, Date, Number, String, Function,
};
export const jsBuiltIns = Object.values(jsBuiltInObjMap);
export function getAllBuiltInProps() {
    //console.log("Debugging get all builtin props-", { jsBuiltIns });
    let props = [];
    for (let builtIn of jsBuiltIns) {
        let biProps = getProps(builtIn);
        //@ts-ignore
        //console.log(`Loading props for builtin: [${builtIn.name}]`, { biProps });
        props = [...props, ...getProps(builtIn)];
    }
    //console.log(`Props before uniqueVals:`, { props });
    props = uniqueVals(props);
    //console.log(`Props AFTER uniqueVals:`, { props });
    return props;
}
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
export const builtInProps = getAllBuiltInProps();
/**
 * Any point to decompose this with allProps?
 */
export function isParsable(arg) {
    if (!arg || isEmpty(arg) || isPrimitive(arg) ||
        //@ts-ignore
        (arg === Object) || (arg === Array) || (arg === Function) ||
        (!isObject(arg) && (typeof arg !== 'function'))) {
        return false;
    }
    return true;
}
export function isParsed(arg) {
    if (!arg || isEmpty(arg) || isPrimitive(arg) ||
        //@ts-ignore
        (arg === Object) || (arg === Array) || (arg === Function) ||
        (!isObject(arg) && (typeof arg !== 'function'))) {
        return arg;
    }
    return false;
}
/**
 * Returns property names from prototype tree. Even works for primitives,
 * but not for null - so catch the exception & return []
 */
export function getProps(obj) {
    if (!obj) {
        return [];
    }
    try {
        let tstObj = obj;
        let props = Object.getOwnPropertyNames(tstObj);
        while (tstObj = Object.getPrototypeOf(tstObj)) {
            let keys = Object.getOwnPropertyNames(tstObj);
            for (let key of keys) {
                props.push(key);
            }
        }
        return uniqueVals(props);
    }
    catch (e) {
        new PkError(`Exception in getProps-`, { obj, e });
    }
    return [];
}
/**
 * Weirdly, most built-ins have a name property, & are of type [Function:Date]
 * or whatever, but Math does NOT have a name property, and is of type "Object [Math]". So try to deal with that...
 */
export function builtInName(bi) {
    var _a;
    let biName = (_a = bi.name) !== null && _a !== void 0 ? _a : bi.toString();
    if ((typeof biName !== 'string') || !biName) {
        throw new PkError(`Weird - no name to be made for BI:`, { bi });
    }
    return biName;
}
/**
 * Returns false if arg is NOT a built-in - like Object, Array, etc,
 * OR - the built-in Name as string.
 */
export function isBuiltIn(arg) {
    try { //For null, whatever odd..
        if (jsBuiltIns.includes(arg)) {
            //return arg.name ?? arg.toString();
            return builtInName(arg);
        }
    }
    catch (e) {
        new PkError(`Exception in isBuiltin for arg:`, { arg, e });
    }
    return false;
}
//skipProps - maybe stuff like 'caller', 'callee', 'arguments'?
export const keepProps = ['constructor', 'prototype', 'name', 'class',
    'type', 'super', 'length',];
export function filterProps(props) {
    props = inArr1NinArr2(props, builtInProps);
    props = props.filter((e) => !(e.startsWith('call$')));
    return props;
}
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
//export function allProps(obj: any, { dets = 'p', filter = true }: { dets?: string, filter?: boolean } = {}) {
export function allProps(obj, opt = 'tvp', depth = 6) {
    if (!isObject(obj)) {
        return typeOf(obj);
    }
    if (depth-- < 0) {
        return 'END';
    }
    /*
    if (!isParsable(obj)) {
      return false;
    }
    */
    //let opts = opt.split('');
    let opts = [...opt];
    let filter = !opts.includes('f');
    let res = isParsed(obj);
    if (res) {
        return {
            val: res, type: typeOf(res), parsed: res,
        };
    }
    /*
    if (isPrimitive(obj) || (!isObject(obj) && (typeof obj !== 'function'))) {
      //return false; // Or the primitive?
      return obj;
    }
    */
    let tstKeys = [];
    for (let prop of keepProps) {
        try {
            let val = obj[prop];
            if (val === undefined) {
                continue;
            }
            tstKeys.push(prop);
        }
        catch (e) {
            console.error(`error in probeProps with prop [${prop}]`, e, obj);
        }
    }
    let objProps = getProps(obj);
    if (filter) {
        objProps = filterProps(objProps);
    }
    let unique = uniqueVals(objProps, tstKeys);
    if (isEmpty(intersect(opts, ['t', 'v', 'p',]))) { //Just the array of props
        return unique;
    } //We want more...
    let retObj = {};
    for (let prop of unique) {
        let ret = {};
        let val = obj[prop];
        if (['prototype', 'constructor'].includes(prop)) {
            let bi;
            if (bi = isBuiltIn(val)) {
                ret.val = bi;
                retObj[prop] = ret;
                continue;
            }
        }
        if (opts.includes('v')) {
            ret.val = val;
        }
        if (opts.includes('t')) {
            ret.type = typeOf(val);
        }
        if (opts.includes('p') && isParsable(val)) {
            ret.parsed = allProps(val, opt, depth);
        }
        retObj[prop] = ret;
    }
    return retObj;
}
export function allPropsWithTypes(obj) {
    return allProps(obj, 't');
}
export function objInfo(arg, opt = 'tpv') {
    let toArg = typeOf(arg);
    let info = { type: toArg };
    if (!isObject(arg)) {
        console.error(`in objInfo - arg not object?`, { arg, toArg });
        return info;
    }
    try {
        let objProps = {};
        //SHOULD CHANGE BELOW TO isParsed()...
        if (isParsable(arg)) {
            let instance = isInstance(arg);
            let inheritance = classStack(arg);
            if (instance) {
                info.instance = instance;
            }
            if (inheritance && Array.isArray(inheritance) && inheritance.length) {
                info.inheritance = inheritance;
            }
            //objProps = allPropsWithTypes(arg);
            objProps = allProps(arg, opt);
            if (objProps) {
                info.props = objProps;
            }
        }
        else {
            info.val = arg;
            info.parsed = arg;
        }
    }
    catch (e) {
        console.error(`Exception in objInfo for`, { e, arg, opt, info });
    }
    return info;
}
/**
 * Take input arrays, merge, & return single array w. unique values
 */
export function uniqueVals(...arrs) {
    let merged = [];
    for (let arr of arrs) {
        merged = [...merged, ...arr];
    }
    return Array.from(new Set(merged));
}
/* Use lodash isObject (excludes functions) or isObjectLike (includes functions)
export function isRealObject(anobj) {
  if (!anobj || typeof anobj !== "object") {
    return false;
  }
  return Object.getPrototypeOf(anobj) === Object.getPrototypeOf({});
}
*/
//export function typeOf(anObj: any, level?: Number): String {
export function typeOf(anObj, opts) {
    var _a;
    let level = null;
    let functionPrefix = 'function: ';
    let simplePrefix = 'simple ';
    if (isPrimitive(opts)) {
        level = opts;
    }
    else if (isSimpleObject(opts)) {
        level = opts.level;
        if (opts.justType) {
            simplePrefix = functionPrefix = '';
        }
    }
    try {
        if (anObj === null) {
            return "null";
        }
        let to = typeof anObj;
        if (to === "function") {
            let keys = Object.keys(anObj);
            let name = anObj === null || anObj === void 0 ? void 0 : anObj.name;
            if (!name) {
                name = 'function';
            }
            //      console.log("Function Keys:", keys);
            return `${functionPrefix}${name}`;
        }
        if (to !== "object") {
            return to;
        }
        if (isSimpleObject(anObj)) {
            //let ret = "Type: Simple Object";
            let ret = `${simplePrefix}Object`;
            if (level) {
                let keys = Object.keys(anObj);
                ret += `\nKeys: ${JSON.stringify(keys)}`;
            }
            return ret;
        }
        if (!anObj) {
            return 'undefined?';
        }
        let ret = `${(_a = anObj === null || anObj === void 0 ? void 0 : anObj.constructor) === null || _a === void 0 ? void 0 : _a.name}`;
        if (level) {
            let keys = Object.keys(anObj);
            console.error({ keys });
            ret += `\nKeys: ${JSON.stringify(keys)}`;
        }
        return ret;
    }
    catch (err) {
        console.error("Error in typeOf:", err);
        return JSON.stringify({ err, anObj }, null, 2);
    }
}
/**
 * Replace w. below when finished.
 */
export function getRand(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}
/**
 * Gets cnt random unique elements of an array
 * Not the most efficient but it works
 * if cnt = 0, returns a single element, else an array of els
 */
export function getRandEls(arr, cnt = null) {
    if (!Array.isArray(arr) || !arr.length) {
        throw new PkError(`Invalid array arg to getRandEls:`, { arr });
    }
    cnt = Math.min(cnt, arr.length);
    if (!cnt) {
        return arr[Math.floor((Math.random() * arr.length))];
    }
    let arrKeys = Object.keys(arr).map((el) => parseInt(el));
    let keyLen = arrKeys.length;
    cnt = Math.min(cnt, keyLen);
    let subKeys = [];
    let num = 0;
    while (true) {
        let tstKey = getRand(arrKeys);
        if (subKeys.includes(tstKey)) {
            continue;
        }
        subKeys.push(tstKey);
        if (subKeys.length >= cnt) {
            break;
        }
    }
    let ret = subKeys.map((key) => arr[key]);
    let retLen = ret.length;
    return ret;
}
/**
*/
/**
 * Retuns a random integer
 * @param numeric to - max int to return
 * @param numberic from default 0 - optional starting/min number
 * @return int
 */
export function randInt(to, from = 0) {
    // Convert args to ints if possible, else throw
    //@ts-ignore
    if (isNaN((to = parseInt(to)) || isNaN((from = parseInt(from))))) {
        throw new PkError(`Non-numeric arg to randInt():`, { to, from });
    }
    if (from === to) {
        return from;
    }
    if (from > to) {
        let tmp = from;
        from = to;
        to = tmp;
    }
    let bRand = from + Math.floor((Math.random() * ((to + 1) - from)));
    return bRand;
}
/**
 * Lazy way to get type of multiple variables at once
 * @param simple object obj - collection of properties to type
 * @return object - keyed by the original keys, to type
 */
export function typeOfEach(obj) {
    if (!isSimpleObject(obj) || isEmpty(obj)) {
        console.error(`Bad obj param to typeOfEach - obj:`, { obj });
        return false;
    }
    let res = {};
    let keys = Object.keys(obj);
    for (let key of keys) {
        let val = obj[key];
        res[key] = typeOf(val);
    }
    return res;
}
export function valWithType(val) {
    return { type: typeOf(val), val };
}
/** Safe stringify - try first, then acycling */
export function JSON5Stringify(arg) {
    try {
        return JSON5.stringify(arg, null, 2);
    }
    catch (e) {
        //@ts-ignore
        return JSON5.decycle(arg, null, 2);
    }
}
export function JSONStringify(arg) {
    /*
    if (arg === undefined) {
      return 'undefned';
    } else if (arg === null) {
      return 'null';
    }
    */
    try {
        return JSON.stringify(arg, null, 2);
    }
    catch (e) {
        //@ts-ignore
        return JSON.decycle(arg, null, 2);
    }
}
/** Totally lifted from Axios - but they don't export it!
 * Takes an HTTP header string and objectifies it -
 * directives as keys
 * with values or undefined
 * @return object
 */
export function parseHeaderString(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
    }
    return tokens;
}
/**
 * stupid name - but just removes all quotes, spaces, etc
 * from a string.
 */
export function stripStray(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }
    str = str.replaceAll(/['" ]/g, '');
    return str;
}
/** For attributes, etc, as valid JS variable.
 * BONUS: Strips any extraneous quotes, etc.
 * @return string - camelCased
 */
export function toCamelCase(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }
    str = stripStray(str);
    return str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}
export function toSnakeCase(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }
    str = stripStray(str);
    str = str.replace(/([a-z]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    return str;
}
//# sourceMappingURL=common-operations.js.map