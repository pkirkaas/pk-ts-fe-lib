/**
 * Experimental implementation of data access by tags - - to retrieve objects by tags rather than just key->value
 * March 2023
 * Paul Kirkaas
 *
 */
import { jsonClone, isSubset, arraysEqual, intersect } from './index.js';
// TODO: Rename labels
// Get all labels from collection
function errRep(msg, ...data) {
    console.error(msg, Object.assign({}, data));
    throw new Error(msg);
}
/**
 * Base utility class for TagObjs & TagObjCollections
 */
export class BaseTags {
    /** Takes a 'tags' arg - null, empty array, or array of strings,
     * and returns array of string tags - or throws error
     */
    static normTags(tags) {
        //let toTags = typeof tags;
        if (typeof tags === 'string') {
            tags = [tags];
        }
        else if (!tags) {
            tags = [];
        }
        if (!Array.isArray(tags)) {
            errRep('Invalid tags arg for constructor of TagObj', { tags });
        }
        // Make sure they are unique
        tags = [...new Set(tags)];
        for (let tag of tags) {
            if (typeof tag !== 'string') {
                errRep(`Invalid tag:`, { tag });
            }
        }
        return tags;
    }
    /**
     * Returns a new TagObj instance if arg is an instance of
     * TagObj OR an object of {tdata:?, tags:?}
     * If not a valid TagObj constructor arg, return false
     */
    static toTagObj(arg) {
        console.log(`in toTagObj:`, { arg });
        if (!arg || typeof arg !== 'object') {
            return false;
        }
        if (arg instanceof TagObj) {
            return arg.clone();
        }
        if ('tdata' in arg) { // If a simple object with a key='tdata', assume 
            return new TagObj(arg.tdata, arg.tags);
        }
        return false;
    }
}
/**
 * Associates any kind of data with a set of tags
 */
export class TagObj extends BaseTags {
    constructor(tdata = null, tags) {
        //@ts-ignore
        super(...arguments);
        //let tst = this.constructor.toTagObj(tdata);
        let tst = TagObj.toTagObj(tdata);
        if (tst) {
            this.tdata = tst.tdata;
            this.tags = tst.tags;
            return this;
        }
        //this.tags = this.constructor.normTags(tags);
        this.tags = TagObj.normTags(tags);
        this.tdata = tdata;
    }
    /**
     * Return new instance of TagObj with cloned data
     */
    clone() {
        /*
        let tdata = JSON.parse(JSON.stringify(this.tdata));
        let tags = JSON.parse(JSON.stringify(this.tags));
        */
        let tdata = jsonClone(this.tdata);
        let tags = jsonClone(this.tags);
        //let cloned = new this.constructor(tdata, tags);
        let cloned = new TagObj(tdata, tags);
        return cloned;
    }
    // Checks we have a valid tag array (empty or strings)
    isValid() {
        if (!Array.isArray(this.tags)) {
            return false;
        }
        for (let tag of this.tags) {
            if (typeof tag !== 'string') {
                return false;
            }
        }
        return this;
    }
}
/**
 * Manages a collection of TagObj instances
 */
export class TagObjCol extends BaseTags {
    constructor(tagObjs = null) {
        //@ts-ignore
        super(...arguments);
        this.tagObjs = [];
        if (tagObjs instanceof TagObj) {
            this.tagObjs.push(tagObjs);
        }
        else if (Array.isArray(tagObjs)) {
            for (let tagObj of tagObjs) {
                tagObj = this.constructor['toTagObj'](tagObj);
                if (tagObj) {
                    this.tagObjs.push(tagObj);
                }
                else {
                    errRep('Invalid Arg to TagObjCol constructor', { tagObj });
                }
            }
        }
        this.validate();
    }
    /**
     * Checks we have valid tagObjs
     */
    isValid() {
        if (!Array.isArray(this.tagObjs)) {
            return false;
        }
        for (let tagObj of this.tagObjs) {
            if (!(tagObj instanceof TagObj) || tagObj.isValid() === false) {
                return false;
            }
        }
        return this;
    }
    validate() {
        if (this.isValid() === false) {
            errRep(`Validation for TagOb1Col1 failed`, this.tagObjs);
        }
        return this;
    }
    /**
     * Retrieval methods - any, all, only - accept tag or array of tags
     * Return new instance of matching TagObjCol
     */
    /** Returns ALL items that have ANY tag in common with ANY of the tags arg */
    fetchAny(tags = []) {
        this.validate();
        tags = this.constructor['normTags'](tags);
        let tagObjs = [];
        for (let tagObj of this.tagObjs) {
            if (intersect(tags, tagObj.tags).length) {
                tagObjs.push(tagObj);
            }
        }
        //return new this.constructor(tagObjs);
        return new TagObjCol(tagObjs);
    }
    /**
     * Returns only items that have ALL tags in the tags arg
     */
    fetchAll(tags) {
        this.validate();
        tags = this.constructor['normTags'](tags);
        let tagObjs = [];
        for (let tagObj of this.tagObjs) {
            if (isSubset(tags, tagObj.tags)) {
                tagObjs.push(tagObj);
            }
        }
        //return new this.constructor(tagObjs);
        return new TagObjCol(tagObjs);
    }
    fetchExact(tags) {
        this.validate();
        tags = this.constructor['normTags'](tags);
        let tagObjs = [];
        for (let tagObj of this.tagObjs) {
            if (arraysEqual(tags, tagObj.tags)) {
                tagObjs.push(tagObj);
            }
        }
        //return new this.constructor(tagObjs);
        return new TagObjCol(tagObjs);
    }
    /**
     * Returns array of just the data components of the TagObjs
     */
    data() {
        this.validate();
        return this.tagObjs.map((el) => el.tdata);
    }
    /**
     * Add a tag object to the collection.
     * @param tagObj - instance of TagObj, or simple obj of {tdata:?, tags:?},
     * else raw data
     * @param tags - only if the tagObj param is not an instance of TagObj or tagObjData
     */
    add(tagObj, tags) {
        let tst = this.constructor['toTagObj'](tagObj);
        if (tst) {
            tagObj = tst;
        }
        if (!(tagObj instanceof TagObj)) {
            tags = this.constructor['normTags'](tags);
            tagObj = new TagObj(tagObj, tags);
        }
        this.tagObjs.push(tagObj);
        return this;
    }
}
//# sourceMappingURL=tag-classes.js.map