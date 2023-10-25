/**
 * Browser Manipulation utilities -
 *
 *
 * for now, just check if the loaded css & js files are still present
 * Why? To auto-reload the browser after a vite build, which changes the names of the css & js artifacts
 * 2023 Paul Kirkaas
 *
 * Vite build creates a css & js asset file in the build directory, with a unique cachebuster in the names,
 *  changes after each build. So set interval to check if the css/js files in index.html still exist,
 * if not, reload.
 *
 * I use nodemon to monitor the fe src files & rebuild if anything changes.
 *
 * Just import and run startAvailableChecks anywhere in the code, and page will reload after new build.
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
    console.log(`In Unavalable hrefs, allrefs:`, allRefs);
    for (let ref of allRefs) {
        let res = await isUrlReachable(ref);
        if (!res) {
            console.error(`In unavaliable refs - miss on [${ref}]; all refs:`, allRefs);
            return true;
        }
    }
    return false;
}
export async function reloadIfUnavailable() {
    console.log("In the interval check reload function...");
    let noAvail = await unavailableHrefs();
    if (noAvail) {
        console.error(`Missing hrefs; trying to reload...`);
        location.reload();
    }
}
//# sourceMappingURL=browserTweaks.js.map