/**
 * Experimental implementation of data access by tags - - to retrieve objects by tags rather than just key->value
 * March 2023
 * Paul Kirkaas
 *
 */
/**
 * Base utility class for TagObjs & TagObjCollections
 */
export declare class BaseTags {
    /** Takes a 'tags' arg - null, empty array, or array of strings,
     * and returns array of string tags - or throws error
     */
    static normTags(tags: any): any;
    /**
     * Returns a new TagObj instance if arg is an instance of
     * TagObj OR an object of {tdata:?, tags:?}
     * If not a valid TagObj constructor arg, return false
     */
    static toTagObj(arg: any): false | TagObj;
}
/**
 * Associates any kind of data with a set of tags
 */
export declare class TagObj extends BaseTags {
    /**
     * @param tdata - any kind of data, including null
     * @param tags - tag string, array of strings, or empty/null
     */
    tags: string[];
    tdata: any;
    constructor(tdata?: any, tags?: any);
    /**
     * Return new instance of TagObj with cloned data
     */
    clone(): TagObj;
    isValid(): false | this;
}
/**
 * Manages a collection of TagObj instances
 */
export declare class TagObjCol extends BaseTags {
    /** Creates an instance of TagObjCol
     * @param tagObjs -  null, TagObj instance, empty array, array of TagObj instances
     * or array of {tdata:?, tags:?}
     */
    tagObjs: any[];
    constructor(tagObjs?: any);
    /**
     * Checks we have valid tagObjs
     */
    isValid(): false | this;
    validate(): this;
    /**
     * Retrieval methods - any, all, only - accept tag or array of tags
     * Return new instance of matching TagObjCol
     */
    /** Returns ALL items that have ANY tag in common with ANY of the tags arg */
    fetchAny(tags?: any): TagObjCol;
    /**
     * Returns only items that have ALL tags in the tags arg
     */
    fetchAll(tags?: any): TagObjCol;
    fetchExact(tags?: any): TagObjCol;
    /**
     * Returns array of just the data components of the TagObjs
     */
    data(): any[];
    /**
     * Add a tag object to the collection.
     * @param tagObj - instance of TagObj, or simple obj of {tdata:?, tags:?},
     * else raw data
     * @param tags - only if the tagObj param is not an instance of TagObj or tagObjData
     */
    add(tagObj: any, tags?: any): this;
}
//# sourceMappingURL=tag-classes.d.ts.map