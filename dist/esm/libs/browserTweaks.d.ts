/**
 * Converts a JS Date to an HTML date string in format YYYY-MM-dd
 * @param dt - the date to convert, else null for now
 * @return string - HTML formatted date
 */
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