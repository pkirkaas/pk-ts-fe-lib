"use client";
/**
 * Converts a JS Date to an HTML date string in format YYYY-MM-dd
 * @param dt - the date to convert, else null for now
 * @return string - HTML formatted date
 */
/*
export function toHtmlDate(dt=null):string {
    let date=pkToDate(dt);
    let str = format(dt, "yyyy-MM-dd");
    return str;
}
*/
/**
 * Run every 10 seconds to check availability, or reload.
 *
 */
export function startAvailableChecks(seconds = 10) {
    let interval = seconds * 1000;
    let intervalId = setInterval(reloadIfUnavailable, interval);
    return intervalId;
}
/**
 * Gets the css files loaded in the dom, for comparison. Should be more flexible, but for now
 * assumes vite build with only a single css & single js load
 *
 */
export function getLoadedCss() {
    const linkElements = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
    return linkElements;
}
export function getLoadedJs() {
    const jsElements = Array.from(document.head.querySelectorAll('script[type="module"]'));
    return jsElements;
}
export function getCssHrefs() {
    let linkElements = getLoadedCss();
    //@ts-ignore
    let linkRefs = linkElements.filter((el) => el['href']).map((el) => el['href']);
    //	console.log({ linkRefs });
    return linkRefs;
}
export function getJsHrefs() {
    let jsEls = getLoadedJs();
    //@ts-ignore
    let linkSrcs = jsEls.filter((el) => el['src']).map((el) => el['src']);
    //	console.log({ linkSrcs });
    return linkSrcs;
}
/**
 * Checks if URL exists & is reachable - async if using fetch, but see below for sync var request = new XMLHttpRequest();
 */
export async function isUrlReachable(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    }
    catch (error) {
        //console.error('Error in isUrlReachable:', error);
        return false;
    }
}
/**
 * Gets all loaded js & css links from the doc & double checks they still exist
 */
export async function unavailableHrefs() {
    let jsRefs = getJsHrefs();
    let cssRefs = getCssHrefs();
    let allRefs = jsRefs.concat(cssRefs);
    //	console.log(`In Unavalable hrefs, allrefs:`, allRefs);
    for (let ref of allRefs) {
        let res = await isUrlReachable(ref);
        if (!res) {
            //			console.error(`In unavaliable refs - miss on [${ref}]; all refs:`, allRefs);
            return true;
        }
    }
    return false;
}
export async function reloadIfUnavailable() {
    //	console.log("In the interval check reload function...");
    let noAvail = await unavailableHrefs();
    if (noAvail) {
        console.error(`Missing hrefs; trying to reload...`);
        location.reload();
    }
}
//# sourceMappingURL=browserTweaks.js.map