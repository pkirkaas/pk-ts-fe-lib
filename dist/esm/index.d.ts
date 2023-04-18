/** Init shared by MongoQP-api & MongoQP-client */
export * from './lib/json-decycle.js';
export type OptArrStr = string | string[];
export type Falsy = false | 0 | "" | null | undefined;
export type GenericObject = {
    [key: string]: any;
};
export type GenObj = {
    [key: string]: any;
};
declare global {
    interface Array<T> {
        readonly random: any;
    }
}
export * from './common-operations.js';
export * from './tag-classes.js';
export * from './object-utils.js';
export * from './util-classes.js';
//# sourceMappingURL=index.d.ts.map