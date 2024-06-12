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
import { isNumeric, isSimpleObject, camelKeys, } from 'pk-ts-common-lib';
import _ from 'lodash';
import { cx, css as cssCss, } from '@emotion/css';
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
        fc: { display: "flex", "flex-direction": "column" },
        //r: { display: "flex", "flex-direction": "row" },
        fr: { display: "flex", "flex-direction": "row" },
        w: { display: "flex", "flex-wrap": "wrap" },
        nw: { display: "flex", "flex-wrap": "no-wrap" },
        ais: { display: "flex", "align-items": "flex-start" },
        aic: { display: "flex", "align-items": "flex-center" },
        aig: { display: "flex", "align-items": "flex-stretch" },
        jcs: { display: "flex", "justify-content": "flex-start" },
        jcc: { display: "flex", "justify-content": "flex-center" },
        jcg: { display: "flex", "justify-content": "flex-stretch" },
    };
    static flexDisplays = {
        fd: {
            r: this.displays.fr,
            c: this.displays.fc,
        },
        wr: {
            w: this.displays.w,
            n: this.displays.nw,
        },
        ai: {
            s: this.displays.ais,
            c: this.displays.aic,
            g: this.displays.aig,
        },
        jc: {
            s: this.displays.jcs,
            c: this.displays.jcc,
            g: this.displays.jcg,
        },
    };
    /** SO BAD! */
    /**
     * Convenience method for flex displays
     */
    flex(flexOpts = {}) {
        let defaults = { fd: 'r', wr: 'w', ai: 's', jc: 's' };
        let rFlexOpts = { ...defaults, ...flexOpts };
        let dispStyle = {};
        for (let key in rFlexOpts) {
            let val = rFlexOpts[key];
            _.merge(dispStyle, this.thisClass.flexDisplays[key][val]);
        }
        return this.merge(dispStyle);
        //let camelled = camelKeys(dispStyle);
    }
    get camelled() {
        return camelKeys(this.style);
    }
    // Color pairs for fg/bg
    static ltDrkColorPairs = {
        1: { dark: "#000", light: "#fff" },
        2: { dark: "#004", light: "#eff" },
        3: { dark: "#400", light: "#ffe" },
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
     * @key opt - one of the keys for whereKeys
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
    static get builder() { return new this(); }
    styleObj; // A regular JS obj of the built style
    constructor(...sos) {
        this.thisClass = this.constructor;
        this.styleObj = {};
        for (let so of sos) {
            if (so instanceof StyleBuilder) {
                so = so.style;
            }
            if (!isSimpleObject(so)) {
                throw new Error(`Invalid so param:`);
            }
            _.merge(this.styleObj, so);
        }
    }
    get style() {
        return structuredClone(this.styleObj);
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
            }
            if (!isSimpleObject(obj)) {
                throw new Error(`Invalid so param:`);
            }
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
     * @param key - key of ltDrkColorPairs. If numeric & negative, invert true
     * @param invert boolean - invert the light/dark?
     *
     */
    fgbg(key, invert = false) {
        if (isNumeric(key) && (key < 0)) {
            key = -key;
            invert = true;
        }
        let clrPr = this.thisClass.ltDrkColorPairs[key];
        if (invert) {
            this.c(clrPr.light);
            this.bg(clrPr.dark);
        }
        else {
            this.c(clrPr.dark);
            this.bg(clrPr.light);
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
        if (isNumeric(weight)) {
            if (weight < 10) {
                weight = weight * 100;
            }
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
                    _.merge(dispStyle, this.thisClass.displays[dispArg]);
                }
                else {
                    console.error(`String dispArg [${dispArg}] not in disp keys`);
                }
            }
            else if (toDA === "object") { // Merge object
                _.merge(dispStyle, dispArg);
            }
            else {
                console.error(`Unhandled dispArg:`, { dispArg });
            }
        }
        console.log(`About to create display:`, { dispStyle });
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