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
/// <reference types="node" />
/**
 * Run every 10 seconds to check availability, or reload.
 *
 */
export declare function startAvailableChecks(seconds?: number): NodeJS.Timeout;
/**
 * Gets the css files loaded in the dom, for comparison. Should be more flexible, but for now
 * assumes vite build with only a single css & single js load
 *
 */
export declare function getLoadedCss(): Element[];
export declare function getLoadedJs(): Element[];
export declare function getCssHrefs(): any[];
export declare function getJsHrefs(): any[];
/**
 * Checks if URL exists & is reachable - async if using fetch, but see below for sync var request = new XMLHttpRequest();
 */
export declare function isUrlReachable(url: string): Promise<boolean>;
/**
 * Gets all loaded js & css links from the doc & double checks they still exist
 */
export declare function unavailableHrefs(): Promise<boolean>;
export declare function reloadIfUnavailable(): Promise<void>;
//# sourceMappingURL=browserTweaks.d.ts.map