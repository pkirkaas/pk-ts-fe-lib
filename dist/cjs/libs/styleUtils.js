/**
 * CSS Style building utils, based on @emotion/css
 * NOT actually React dependent, no React components, so *.ts
 *
 * React Component utils based on @emotion/react in componentUtils.tsx
 * 24-Jun-11 17:14
 */
/**
 * Absolutely can't rely on CSS to be invariant - for now, localize dependencies
 */
/* @jsxImportSource @emotion/react */
import { PkError, isNumeric, isSimpleObject, camelKeys, isPrimitive, isObject, } from 'pk-ts-common-lib';
import _ from 'lodash';
import { cx, css as cssCss, } from '@emotion/css';
/** Utility - if val a key of obj, return the value
 * else return val itself
*/
export function valFromObj(val, obj) {
    //console.log(`valFromObj`, {val, obj});
    if (isPrimitive(val) && (val in obj)) {
        //let ret = obj[val];
        //console.log(`returning:`,{ret});
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
    thisClass; //Untyped hack
    // Sadly, this doesn't work? thisClass:InstanceType<typeof this.constructor>;
    static displays = {
        //f: { display: "flex" },
        block: { display: "block" },
        inline: { display: "inline-block" },
        //c: { display: "flex", "flex-direction": "column" },
        fc: { display: "flex", "flexDirection": "column" },
        //r: { display: "flex", "flex-direction": "row" },
        fr: { display: "flex", "flexDirection": "row" },
        w: { display: "flex", "flexWrap": "wrap" },
        nw: { display: "flex", "flexWrap": "no-wrap" },
        ais: { display: "flex", "alignItems": "flex-start" },
        aic: { display: "flex", "alignItems": "flex-center" },
        aig: { display: "flex", "alignItems": "flex-stretch" },
        jcs: { display: "flex", "justifyContent": "flex-start" },
        jcc: { display: "flex", "justifyContent": "flex-center" },
        jcg: { display: "flex", "justifyContent": "flex-stretch" },
    };
    static flexDisplays = {
        fd: {
            r: this.displays.fr.flexDirection,
            c: this.displays.fc.flexDirection,
        },
        wr: {
            w: this.displays.w.flexWrap,
            n: this.displays.nw.flexWrap,
        },
        ai: {
            s: this.displays.ais.alignItems,
            c: this.displays.aic.alignItems,
            g: this.displays.aig.alignItems,
        },
        jc: {
            s: this.displays.jcs.justifyContent,
            c: this.displays.jcc.justifyContent,
            g: this.displays.jcg.justifyContent,
        },
    };
    /** SO BAD! */
    /**
     * Convenience method for flex displays
     */
    /*
    flex(flexOpts: GenObj = {}) {
      let defaults: GenObj = { fd: 'r', wr: 'w', ai: 's', jc: 's' };
      let rFlexOpts: GenObj = { ...defaults, ...flexOpts };
      let dispStyle: GenObj = {};
      for (let key in rFlexOpts) {
        let val = rFlexOpts[key];
        _.merge(dispStyle, this.thisClass.flexDisplays[key][val]);
      }
      return this.merge(dispStyle);
      //let camelled = camelKeys(dispStyle);
    }
      */
    /**
     * flex align-items -
     * @param align:string - one of s,c,g or full css align value
     */
    flexa(val = 's') {
        val = valFromObj(val, this.thisClass.flexDisplays.ai);
        return this.merge({ display: 'flex', alignItems: val });
    }
    // flex justify content
    flexj(val = 's') {
        val = valFromObj(val, this.thisClass.flexDisplays.jc);
        return this.merge({ display: 'flex', justifyContent: val });
    }
    //flex direction
    flexd(val = 'r') {
        val = valFromObj(val, this.thisClass.flexDisplays.fd);
        return this.merge({ display: 'flex', flexDirection: val });
    }
    flexw(val = 'w') {
        val = valFromObj(val, this.thisClass.flexDisplays.wr);
        return this.merge({ display: 'flex', flexWrap: val });
    }
    get camelled() {
        return camelKeys(this.style);
    }
    // Color pairs for fg/bg - fg dark, bg light, but can invert
    static fgBgPairs = {
        1: { fg: "#000", bg: "#fff" },
        2: { fg: "#004", bg: "#eff" },
        3: { fg: "#400", bg: "#ffe" },
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
    /**
     * Makes a style object for margin/padding/border
     * @propBase - m,b,p
     * @val - the value
     * @key opt - one of the keys for whereKeys 't','b','x','y', etc
     * @return - basic object w. css style props/vals
     */
    static mkMPBWhereProps(propBase, val, key) {
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
    static get builder() { return new this(); }
    static build(...args) { return new this(...args); }
    styleObj; // A regular JS obj of the built style
    constructor(...sos) {
        this.thisClass = this.constructor;
        this.styleObj = {};
        this.merge(...sos);
        /*
        for (let so of sos) {
          if (so instanceof StyleBuilder) {
            so = so.style;
          }
          if (!isSimpleObject(so)) {
            throw new Error(`Invalid so param:`);
          }
          so = camelKeys(so);
          _.merge(this.styleObj, so);
        }
          */
    }
    get style() {
        return camelKeys(structuredClone(this.styleObj));
    }
    get className() {
        return cssCss(this.style);
    }
    get clone() {
        return new this.thisClass(this);
    }
    merge(...objs) {
        for (let obj of objs) {
            if (obj instanceof StyleBuilder) {
                obj = obj.style;
                //obj = obj.camelled;
            }
            if (!isSimpleObject(obj)) {
                throw new Error(`Invalid so param:`);
            }
            obj = camelKeys(obj);
            _.merge(this.styleObj, obj);
        }
        return this;
    }
    // Merges value to key
    add(key, value) {
        return this.merge({ [key]: value });
    }
    nest(key, value) {
        return this.add(`& ${key}`, value);
    }
    ta(align) {
        let aligns = {
            c: "center",
            l: "left",
            r: "right",
        };
        if (align in aligns) {
            align = aligns[align];
        }
        this.styleObj.textAlign = align;
        return this;
    }
    // Start style builder methods
    /**
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
        if (isPrimitive(pair)) {
            if (isNumeric(pair) && (pair < 0)) {
                pair = -pair;
                invert = true;
            }
            objPair = this.thisClass.fgBgPairs[pair];
        }
        else if (Array.isArray(pair)) {
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
        if (invert) {
            this.c(objPair.fg);
            this.bg(objPair.bg);
        }
        else {
            this.c(objPair.bg);
            this.bg(objPair.fg);
        }
        return this;
    }
    /**
     * Inner Border
     */
    ib(color = "#888", spread = 1) {
        this.styleObj.boxShadow = `inset 0px 0px 0px ${spread} ${color}`;
        return this;
    }
    fs(sz) {
        if (sz in this.thisClass.fontSizeMap) {
            sz = this.thisClass.fontSizeMap[sz];
        }
        this.styleObj.fontSize = sz;
        return this;
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
        if (!arg)
            return this;
        let mg = this.thisClass.mkMPBWhereProps('m', arg, which);
        _.merge(this.styleObj, mg);
        return this;
    }
    p(arg, which) {
        if (!arg)
            return this;
        let mg = this.thisClass.mkMPBWhereProps('p', arg, which);
        _.merge(this.styleObj, mg);
        return this;
    }
    // Border - make this better
    br(color, radius) {
        if (!color) {
            color = "#888";
        }
        let ret = {
            border: `solid ${color} 1px`,
        };
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
    // Display - come up with clever args
    /**
     * Set the display
     * @param ...dispArgs - array of strings - keys to static:displays, or valid CSS display values
     * Merged together sequentially
     */
    d(...dispArgs) {
        let dispStyle = {};
        for (let dispArg of dispArgs) {
            let toDA = typeof dispArg;
            if (toDA === "string") {
                if (dispArg in this.thisClass.displays) {
                    _.merge(dispStyle, camelKeys(this.thisClass.displays[dispArg]));
                }
                else {
                    console.error(`String dispArg [${dispArg}] not in disp keys`);
                }
            }
            else if (toDA === "object") { // Merge object
                _.merge(dispStyle, camelKeys(dispArg));
            }
            else {
                console.error(`Unhandled dispArg:`, { dispArg });
            }
        }
        //console.log(`About to create display:`, { dispStyle });
        return this.merge(dispStyle);
    }
}
/**
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 *  - for now, just works for
 * top level args of type StyleBuilder
 */
export function cxsb(...args) {
    let ret = [];
    for (let arg of args) {
        if (arg instanceof StyleBuilder) {
            arg = arg.className;
        }
        ret.push(arg);
    }
    return cx(...ret);
}
export function mkStyle(args) {
    console.log("Making Styles");
    return "Trying to make styles";
}
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