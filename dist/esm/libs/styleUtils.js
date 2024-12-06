/**
 * CSS Style building utils, based on @emotion/css
 * NOT actually React dependent, no React components, so *.ts
 *
 * React Component utils based on @emotion/react in componentUtils.tsx
 * 24-Jun-11 17:14
 *
 * Usage:
 * Main export is the StyleBuilder class. It creates a chainable `styleBuilder` instance
 * that can be used to create css styles/classes.
 *
 * StyleBuilder:
 *   static methods:
 *     build(...args) - returns a new instance of the class
 *   static properties:
 *     builder: static getter - returns a new instance of the class
 *   instance methods:
 *     flex(opts:StyleBuilderFlexArgs) - Creates  flex display options
 *     m(sz="1em",where?:WhereKeyType) - creates margin - all or 't'|'r'|'b'|'l'|'x'|'y'|'a'
 *     p(sz="1em",where?:WhereKeyType) - creates padding - all or 't'|'r'|'b'|'l'|'x'|'y'|'a'
 *     fs(sz) - font size
 *     fw(weight) - font weight
 *     c(color) - font color
 *     bg(color) - background color
 *     ta(align) - text align - 'c' 's' 'e'
 *     fw(weight) - font weight
 *     ff(fontFamily) - font family - key of fontFamilies -'c', 'r', 's', etc
 *     d(arg:string|StyleBuilderFlexArgs) - set display - 'i' | 'inline' | 'b' | 'block' | StyleBuilderFlexArgs
 *     br(borderParams:BorderParams) - border - color, style, width, radius, which - all optional
 *     add(key, val) - add a style property/value pair
 *     w/minw/maxw/h/minh/maxh(sz) - width/height - all or 'min'|'max'
 *     ib(color?,spread?) - inner border
 *   instance properties:
 *     className: getter string - the generated class name
 *     style: getter object - the generated style object
 *
 *
 * On the `StyleBuilder` class, use the `builder` static getter method to get a new instance.
 *
 * On an instance, us the `className` property to get the
 * generated class name, or the `style` property to get the generated style object.
 * Use the `clone` instance getter to get a new instance of the same style.
 *
 * let sb = StyleBuilder.builder.p(5).m(10).
 */
/**
 * Absolutely can't rely on CSS to be invariant - for now, localize dependencies
 */
/* @jsxImportSource @emotion/react */
// import npm packages
import _ from 'lodash';
import { cx, css as cssCss, } from '@emotion/css';
import { serializeStyles, } from '@emotion/serialize';
// import pklib packages
import { PkError, isNumeric, isSimpleObject, camelKeys, isPrimitive, isObject, isEmpty, } from 'pk-ts-common-lib';
//export type Scalar = string | number;
/** Utility - if val a key of obj, return the value
 * for the key, else return val itself.
 * Purpose: To allow some shortcut keys for CSS values, like
 * {ai:'s'} for "alignItems:'flex-start'" - but also allow setting CSS values NOT
 * using the shortcut keys.
*/
export function valFromObj(val, obj) {
    if (isPrimitive(val) && (val in obj)) {
        return obj[val];
    }
    return val;
}
//** Build up CSS style property objects  */
/**
 * Base Class to build React/Emotion style objects
 * Extend to add more presets/options
 *
 * @constructor - optional array of style objects -
 *   either general objs, or instances of this, which are merged
 *
 * @property style - a cloned, simple JS Object of the built style
 *
 * @methods
 *
 */
export class StyleBuilder {
    // Instance Properties
    styleObj; // A regular JS obj of the built style
    constructor(...sos) {
        this.styleObj = {};
        this.merge(...sos);
    }
    // Instance Getters
    get Class() {
        return this.constructor;
    }
    get style() {
        return camelKeys(structuredClone(this.styleObj));
    }
    get className() {
        return cssCss(this.style);
    }
    get clone() {
        return new this.Class(this);
    }
    get camelled() {
        return camelKeys(this.style);
    }
    // Now some 'convenience' getters...
    get fullw() {
        return this.w('100%');
    }
    get fullh() {
        return this.h('100%');
    }
    get full() {
        return this.fullw.fullh;
    }
    // Instance Methods
    /**
     * Convenience method for flex displays
     * @param flexOpts? GenObj - object w. flex opt keys and values
     * opt keys: fd (flex-direction), wr (wrap), ai (alignItems), jc (justifyContent)
     * opt key vals - shortcut key into vals, or string value
     */
    flex(flexOpts = {}) {
        let defaults = { fd: 'r', wr: 'w', ai: 's', jc: 's' };
        let rFlexOpts = { ...defaults, ...flexOpts };
        let dispStyle = {
            display: 'flex',
        };
        //let fDisps = this.thisClass.flexDisplayOpts;
        let fDisps = this.Class.flexDisplayOpts;
        for (let propkey in rFlexOpts) {
            let prop = fDisps[propkey].prop;
            let valkey = rFlexOpts[propkey];
            let val = valFromObj(valkey, fDisps[propkey].vals);
            _.merge(dispStyle, { [prop]: val });
        }
        return this.merge(dispStyle);
    }
    // Instance Getters
    // Instance Methods
    toString() {
        return this.className;
    }
    classNames(...args) {
        let classNames = [];
        for (let arg of args) { // StyleBuilder instance or style object
            if (isObject(arg)) {
                arg = StyleBuilder.build(arg).className;
            }
            if (typeof arg !== "string") {
                throw new Error(`Invalid arg type: ${typeof arg}`);
            }
            classNames.push(arg);
        }
        classNames.push(this.className);
        return classNames.join(" ");
    }
    merge(...objs) {
        for (let obj of objs) {
            if (obj instanceof StyleBuilder) {
                obj = obj.style;
            }
            if (!isSimpleObject(obj)) {
                throw new Error(`Invalid so param:`);
            }
            obj = camelKeys(obj);
            _.merge(this.styleObj, obj);
        }
        return this;
    }
    // Add any css property/value pair
    add(key, value) {
        return this.merge({ [key]: value });
    }
    nest(key, value) {
        return this.add(`& ${key}`, value);
    }
    ta(align = 'c') {
        //let aligns = this.thisClass.aligns;
        let aligns = this.Class.aligns;
        if (align in aligns) {
            align = aligns[align];
        }
        this.styleObj.textAlign = align;
        return this;
    }
    ff(fontFamily) {
        return this.merge({ fontFamily: valFromObj(fontFamily, this.Class.fontFamilies) });
    }
    /**
     * TODO: TERRIBLE !! Improve with better understanding of color theory & theming - mui color utils or something
     * Make forground/background color pairs from the list
     * @param pair - primitive - key to ltDrkColorPairs obj,
     *       (If numeric & negative, invert true)
     *      OR array (of CSS Colors)
     *     OR JSObject {fg,bg | lt,dk | light, dark}
     *
     * @param invert boolean - invert the light/dark?
     *
     */
    fgbg(pair, invert = false) {
        let objPair = {};
        if (isPrimitive(pair)) { // Should be key to fgBgPairs
            if (isNumeric(pair) && (pair < 0)) { // if negative, invert
                pair = -pair;
                invert = true;
            }
            if (pair in this.Class.fgBgPairs) {
                objPair = this.Class.fgBgPairs[pair];
            }
            else { // TODO: Allow a CSS Color string, and invert/complement it for fg/bg
                throw new PkError(`Invalid fgbg arg:`, { pair, invert });
            }
        }
        else if (Array.isArray(pair)) { // Array of 2 CSS Colors
            objPair.fg = pair[0];
            objPair.bg = pair[1];
        }
        else if (isObject(pair)) {
            objPair.fg = pair.fg;
            objPair.bg = pair.bg;
        }
        if (!isObject(objPair) || !objPair.fg || !objPair.bg) {
            throw new PkError(`Invalid arg to SB.fgbg:`, { pair, invert });
        }
        let ret = {};
        if (invert) {
            ret.color = (objPair.fg);
            ret.background = (objPair.bg);
        }
        else {
            ret.color = (objPair.bg);
            ret.background = (objPair.fg);
        }
        return this.merge(ret);
    }
    /**
     * Inner Border
     */
    ib(color = "#888", spread = 1) {
        /*
        this.styleObj.boxShadow = `inset 0px 0px 0px ${spread} ${color}`;
        return this;
        */
        return this.merge({ boxShadow: `inset 0px 0px 0px ${spread} ${color}` });
    }
    fs(sz) {
        if (sz in this.Class.fontSizeMap) {
            sz = this.Class.fontSizeMap[sz];
        }
        return this.merge({ fontSize: sz });
        /*
        this.styleObj.fontSize = sz;
        return this;
        */
    }
    // Dimensions - w, maxw, minw, h, maxh, minh
    w(val) { return this.merge({ width: val }); }
    maxw(val) { return this.merge({ maxWidth: val }); }
    minw(val) { return this.merge({ minWidth: val }); }
    h(val) { return this.merge({ height: val }); }
    maxh(val) { return this.merge({ maxHeight: val }); }
    minh(val) { return this.merge({ minHeight: val }); }
    /*
  
   * make a margin prop
   * @param arg string|number - if number, px, if string, direct
   * @param which string|empty - if empty, all margins, if string, one of t|b|l|r|v|h|x|y
   *
    */
    m(arg, which) {
        if (!arg) {
            arg = "1em";
        }
        let mg = this.Class.mkMPBWhereProps('m', arg, which);
        _.merge(this.styleObj, mg);
        return this;
    }
    mv(arg) {
        return this.m(arg, "v");
    }
    mh(arg) {
        return this.m(arg, "h");
    }
    p(arg, which) {
        if (!arg) {
            arg = "1em";
        }
        let mg = this.Class.mkMPBWhereProps('p', arg, which);
        /*
        _.merge(this.styleObj, mg);
        return this;
        */
        return this.merge(mg);
    }
    pv(arg) {
        return this.p(arg, "v");
    }
    ph(arg) {
        return this.p(arg, "h");
    }
    br(borderParams = {}) {
        if (typeof borderParams === 'string') {
            return this.add('border', borderParams);
        }
        let { color, style, radius, width, which } = { ...(this.Class.borderParamDefaults), ...borderParams };
        let settings = `${style} ${width} ${color}`;
        let ret = {};
        if (which) {
            let sTypes = this.Class.whereKeys[which];
            if (!sTypes) {
                throw new Error(`invalid sType type [${which}]`);
            }
            if (!Array.isArray(sTypes)) {
                sTypes = [sTypes];
            }
            for (let sType of sTypes) {
                ret[`border${sType}`] = settings;
            }
        }
        else {
            ret.border = settings;
        }
        if (radius) {
            ret.borderRadius = radius;
        }
        _.merge(this.styleObj, ret);
        return this;
    }
    fw(weight) {
        if (isNumeric(weight) && (weight < 10)) {
            weight = weight * 100;
        }
        _.merge(this.styleObj, { fontWeight: weight });
        return this;
    }
    c(color) {
        this.styleObj.color = color;
        return this;
    }
    bg(color) {
        this.styleObj.backgroundColor = color;
        return this;
    }
    /**
     * Set display
     * @param arg - string or StyleBuilderFlexArgs - see StyleBuilderFlexArgs
     * if string, 'i' | 'inline' | 'b' | 'block', else flex
     */
    d(arg) {
        if (typeof arg === "string") {
            if (arg === 'flex') { //default flex
                return this.flex();
            }
            else {
                let disps = {
                    i: 'inline-block',
                    inline: 'inline-block',
                    b: 'block',
                    block: 'block',
                };
                return this.merge({ display: valFromObj(arg, disps) });
            }
        }
        else if (isSimpleObject(arg)) { // Must be flexargs
            return this.flex(arg);
        }
        else { //??
            throw new PkError(`Unhandled arg type:`, { arg });
        }
    }
    // Static Methods
    /**
     * Makes a style object for margin/padding/border
     * @propBase - m,b,p
     * @val - the value
     * @key opt - one of the keys for whereKeys 't','b','x','y', etc
     * @return - basic object w. css style props/vals
     */
    static mkMPBWhereProps(propBase, val = "1em", key) {
        let propType = this.bpmKeys[propBase];
        if (!propType) {
            throw new Error(`invalid prop type [${propBase}]`);
        }
        let ret = {};
        if (!key) {
            ret[propType] = val;
            return ret;
        }
        let sTypes = this.whereKeys[key];
        if (!sTypes) {
            throw new Error(`invalid sType type [${key}]`);
        }
        if (!Array.isArray(sTypes)) {
            sTypes = [sTypes];
        }
        for (let sType of sTypes) {
            ret[`${propType}${sType}`] = val;
        }
        return ret;
    }
    /**
     * static builder & build(args) - to avoid `(new StyleBuilder(...args)).chain1(1)...etc`
     */
    static build(...args) { return new this(...args); }
    // Static Getters
    static get builder() { return new this(); }
    // Static Props
    static flexDisplayOpts = {
        fd: {
            prop: 'flexDirection',
            vals: {
                r: 'row',
                c: 'column',
            },
        },
        wr: {
            prop: 'wrap',
            vals: {
                w: 'wrap',
                n: 'no-wrap',
            },
        },
        ai: {
            prop: 'alignItems',
            vals: {
                s: 'flex-start',
                e: 'flex-end',
                c: 'center',
                g: 'stretch',
                b: 'baseliine',
            }
        },
        jc: {
            prop: 'justifyContent',
            vals: {
                s: 'flex-start',
                c: 'center',
                e: 'flex-end',
                b: 'space-between',
                a: 'space-around',
            }
        },
    };
    // Color pairs for fg/bg - fg dark, bg light, but can invert
    static fgBgPairs = {
        1: { fg: "#000", bg: "#fff" },
        2: { fg: "#004", bg: "#eff" },
        3: { fg: "#400", bg: "#ffe" },
        4: { fg: "#040", bg: "#fef" },
        5: { fg: "#404", bg: "#efe" },
        blwh: { fg: "#004", bg: "#fff" },
        rdwh: { fg: "#400", bg: "#fff" },
    };
    static fontSizeMap = {
        xxs: "xx-small",
        xs: "x-small",
        s: "small",
        sm: "small",
        m: "medium",
        md: "medium",
        l: "large",
        lg: "large",
        xl: "x-large",
        xxl: "xx-large",
        xxxl: "xxx-large",
        smaller: "smaller",
        larger: "larger"
    };
    static fontFamilies = {
        v: 'verdana',
        verdana: 'verdana,',
        c: 'Courier New, monospace',
        courier: 'Courier New, monospace',
        l: "Lucidia Console",
        lucidia: "Lucidia Console",
        t: 'times, serif',
        timtes: 'times, serif',
        r: 'roboto',
        roboto: 'roboto',
        a: 'arial',
        arial: 'arial',
        h: 'helvetica',
        helvetica: 'helvetica',
    };
    // Border
    static borderParamDefaults = { color: "#888", style: "solid", width: "1px", radius: 0, which: null };
    static aligns = {
        c: "center",
        l: "left",
        r: "right",
    };
    // For margin/padding/border locations
    static whereKeys = {
        t: "Top",
        b: "Bottom",
        l: "Left",
        r: "Right",
        v: ["Top", "Bottom"],
        y: ["Top", "Bottom"],
        h: ["Left", "Right"],
        x: ["Left", "Right"],
    };
    static bpmKeys = {
        m: 'margin',
        p: 'padding',
        b: 'border',
    };
}
/// END OF STYLEBUILDER CLASS !!!
/**
 * Laziness again - SB is just a new StyleBuilder instance
 */
//export const SB=StyleBuilder.builder; 
/**
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 * The real/orig cx can accept args which are an array of args, which is better...
 *  - for now, just works for
 * top level args of type StyleBuilder
 * @param ...args - one or more:
 *     StyleBuilder instances
 *     style objects
 *     string classNames
 * @return string - space separated classNames - NOTE - classNames MAY BE COMPOSED - so output may have fewer & different classNames than input
 */
export function cxsb(...args) {
    let ret = [];
    //let idx = 0;
    //stdOut(`cxsb args:`, args, dbgReport(...args));
    for (let arg of args) {
        // idx++;
        if (isEmpty(arg)) {
            continue;
        }
        //let initToArg = typeOf(arg);
        //console.log(`\ninitToArg[${idx}] - ${initToArg}]`);
        if (isSimpleObject(arg)) {
            arg = StyleBuilder.build(arg);
        }
        if (arg instanceof StyleBuilder) {
            arg = arg.className; // Or maybe arg.style?
        }
        if (typeof arg !== "string") {
            //  let toArg = typeOf(arg);
            // console.log(`Non string arg TO: [${toArg}]`,{arg});
        }
        else {
            //console.log(`Adding str arg: ${arg}`);
        }
        ret.push(arg);
    }
    return cx(...ret);
    //return cx(ret);
}
/**
 * Try to emulate the @emotion/react/css function, which accepts styles, but extend to use
 * SB instances, like cxsb above
 * Use in custom components with the css prop - css={csssb(styles)}
 */
export function csssb(...args) {
    let ret = [];
    for (let arg of args) {
        if (arg instanceof StyleBuilder) {
            arg = arg.style;
        }
        ret.push(arg);
    }
    return serializeStyles(ret);
}
/*
export function mkStyle(args) {
  console.log("Making Styles");
  return "Trying to make styles";
}
  */
/*
export const withStyled = (styles, base='div') => (props) => {
  let Base = base;
  let sb = new StyleBuilder(styles);
  let sbStyle = sb.style;
  return (<Base css={css(sbStyle)} {...props} />);
}
  */
/*
export const withStyled = (base) => (props) => {
  let Base = base;
  return (<Base {...props} />);
}
*/
//# sourceMappingURL=styleUtils.js.map