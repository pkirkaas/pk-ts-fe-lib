/** Init shared by MongoQP-api & MongoQP-client */
export * from './lib/json-decycle.js';
//@ts-ignore
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};
export * from './common-operations.js';
export * from './tag-classes.js';
export * from './object-utils.js';
export * from './util-classes.js';
//# sourceMappingURL=index.js.map