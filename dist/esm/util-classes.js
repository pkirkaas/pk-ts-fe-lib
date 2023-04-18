/**
    * Experimental implementation of Various utility classes
    * March 2023
    * Paul Kirkaas
*/
/**
 * Initial placeholder for generic error class with more details than "Error"
 */
export class PkError extends Error {
    constructor(msg, ...params) {
        let opts = null;
        if (Array.isArray(params) && params.length) {
            opts = params[0];
        }
        // JS Error constructor only uses opts if is an object with key 'cause'
        super(msg, opts);
        if (params.length) {
            this.details = params[0];
            params.shift();
        }
        if (params.length) {
            this.extra = params;
        }
    }
}
//# sourceMappingURL=util-classes.js.map