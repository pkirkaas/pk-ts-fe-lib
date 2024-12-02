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
import {
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo, PkError,
  GenObj, isNumeric, isSimpleObject, camelKeys, isPrimitive, isObject,

} from 'pk-ts-common-lib';

import _ from 'lodash';
import {
  cx,
  css as cssCss,
  injectGlobal,
} from '@emotion/css';

import { serializeStyles, } from '@emotion/serialize';

// Interface & Types for StyleBuilder methods
export interface StyleBuilderFlexArgs { // For building flex display styles
  fd?: 'r' | 'c',
  wr?: 'w' | 'n',
  ai?: 's' | 'e' | 'c' | 'g' | 'b',
  jc?: 's' | 'c' | 'e' | 'b' | 'a',
}
export type BmpKeys = 'm'|'p'|'b'; // Base Margin/Padding/Border keys
  //br(color?: string, style?:string, radius?: string|number, which?: WhereKeyType) {
  /*
export interface BorderParams {
  color?: string,
  style?: string,
  radius?: string | number,
  width?: string | number,
  which?: WhereKeyType, 
};
*/

export type BorderParams = Partial<typeof StyleBuilder.borderParamDefaults>;
  //static borderParamDefaults:BorderParams = {color:"#888", style:"solid", width:"1px", radius:0};
export type WhereKeyType = keyof typeof StyleBuilder.whereKeys;
export type AlignType = keyof typeof StyleBuilder.aligns;

  /** Utility - if val a key of obj, return the value
   * for the key, else return val itself.
   * Purpose: To allow some shortcut keys for CSS values, like
   * {ai:'s'} for "alignItems:'flex-start'" - but also allow setting CSS values NOT
   * using the shortcut keys.
  */
  export function valFromObj(val:any, obj:GenObj):any {
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
  //thisClass: any; //Untyped hack
  //get Class():StyleBuilder {
  get Class():any {
    //return this.constructor as StyleBuilder;
    return this.constructor as any;
   } 
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

  /**
   * Shortcuts for flex displays - 4 keys: 
   * fd - flex direction - r(row) or c (column)
   * wr - flex wrap - w(wrap) or nw (nowrap)
   * ai - align items - s(start), c(center), g(stretch)
   * jc - justify content - s(start), c(center), g(stretch)
   */
  /*
  static flexDisplays = {
    fd: { // Flex direction
      r: this.displays.fr.flexDirection,
      c: this.displays.fc.flexDirection,
    },
    wr: { // Wrap
      w: this.displays.w.flexWrap,
      n: this.displays.nw.flexWrap,
    },
    ai: { //align-items
      s: this.displays.ais.alignItems,
      c: this.displays.aic.alignItems,
      g: this.displays.aig.alignItems,
    },
    jc: { //justify-content
      s: this.displays.jcs.justifyContent,
      c: this.displays.jcc.justifyContent,
      g: this.displays.jcg.justifyContent,
    },
  };
  */

  static flexDisplayOpts = {
    fd: { // Flex direction
      prop: 'flexDirection',
      vals: {
        r:'row',
        c:'column',
      },
    },
    wr: { // Wrap
      prop: 'wrap',
      vals: {
        w: 'wrap',
        n: 'no-wrap',
      },
    },
    ai: { //align-items
      prop: 'alignItems',
      vals: {
        s: 'flex-start',
        e: 'flex-end',
        c: 'center',
        g: 'stretch',
        b: 'baseliine',
      }
    },
    jc: { //justify-content
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


  /**
   * Convenience method for flex displays
   * @param flexOpts? GenObj - object w. flex opt keys and values
   * opt keys: fd (flex-direction), wr (wrap), ai (alignItems), jc (justifyContent)
   * opt key vals - shortcut key into vals, or string value
   */

  flex(flexOpts: StyleBuilderFlexArgs = {}) {
    let defaults: StyleBuilderFlexArgs = { fd: 'r', wr: 'w', ai: 's', jc: 's' };
    let rFlexOpts: StyleBuilderFlexArgs = { ...defaults, ...flexOpts };
    let dispStyle: GenObj = {
      display: 'flex',
    };
    //let fDisps = this.thisClass.flexDisplayOpts;
    let fDisps = this.Class.flexDisplayOpts;
    for (let propkey in rFlexOpts) {
      let prop = fDisps[propkey].prop;
      let valkey = rFlexOpts[propkey];
      //let val = fDisps[propkey].vals[valkey];
      let val = valFromObj(valkey, fDisps[propkey].vals);

      _.merge(dispStyle, {[prop]:val});
    }
    return this.merge(dispStyle);
    //console.log(`in StyleBuilder flex method - `, {flexOpts, dispStyle, fDisps, rFlexOpts});
    //return this;
    //let camelled = camelKeys(dispStyle);
  }
  /*
    */

  /**
   * flex align-items - 
   * @param align:string - one of s,c,g or full css align value
   */
  /*
  flexa(val='s') {
    val = valFromObj(val,this.thisClass.flexDisplays.ai);
    return this.merge({display:'flex', alignItems:val});
  }

  // flex justify content
  //@deprecated
  flexj(val='s') {
    val = valFromObj(val,this.thisClass.flexDisplays.jc);
    return this.merge({display:'flex', justifyContent:val});
  }

  //flex direction
  flexd(val='r') {
    val = valFromObj(val,this.thisClass.flexDisplays.fd);
    return this.merge({display:'flex', flexDirection:val});
  }

  flexw(val = 'w') {
    val = valFromObj(val,this.thisClass.flexDisplays.wr);
    return this.merge({display:'flex', flexWrap:val});
  }
    */

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
  static mkMPBWhereProps(propBase:BmpKeys, val="1em", key?:WhereKeyType) {
    let propType = this.bpmKeys[propBase];
    if (!propType) {
      throw new Error(`invalid prop type [${propBase}]`);
    }
    let ret: GenObj = {};
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

  styleObj: GenObj; // A regular JS obj of the built style

  constructor(...sos) {
    //this.thisClass = this.constructor;
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
  get style() { // Returns a dup of the GeneralStyle Object
    return camelKeys(structuredClone(this.styleObj));
  }

  get className() { // Returns the generated className
    return cssCss(this.style);
  }

  get clone() { //New SB instance as clone
    //return new this.thisClass(this);
    return new this.Class(this);
  }


  merge(...objs) { //A fallback to merge other styles in
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

  // Add any css property/value pair
  add(key, value) {
    return this.merge({ [key]: value });
  }

  nest(key, value) { // Just "add", but ensures '&'
    return this.add(`& ${key}`, value);
  }

  static aligns = {
    c: "center",
    l: "left",
    r: "right",
  }
  ta(align:AlignType = 'c') {
    /*
    let aligns = {
      c: "center",
      l: "left",
      r: "right",
    };
    */
   //let aligns = this.thisClass.aligns;
   let aligns = this.Class.aligns;
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
  fgbg(pair: any, invert = false) {
    let objPair:GenObj = {};
    if (isPrimitive(pair)) {
      if (isNumeric(pair) && (pair < 0)) {
        pair = -pair;
        invert = true;
      }
      //objPair = this.thisClass.fgBgPairs[pair];
      objPair = this.Class.fgBgPairs[pair];
    } else if (Array.isArray(pair)) {
      objPair.fg = pair[0];
      objPair.bg = pair[1];
    } else if (isObject(pair)) {
      objPair.fg = pair.fg;
      objPair.bg = pair.bg;
    } 
    if (!isObject(objPair) || !objPair.fg || !objPair.bg) {
      throw new PkError(`Invalid arg to SB.fgbg:`,{pair,invert});
    }
    if (invert) {
      this.c(objPair.fg);
      this.bg(objPair.bg);
    } else {
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



  fs(sz) { //font size
    if (sz in this.Class.fontSizeMap) {
      sz = this.Class.fontSizeMap[sz];
    }
    this.styleObj.fontSize = sz;
    return this;
  }

  // Dimensions - w, maxw, minw, h, maxh, minh
  w(val) { return this.merge({width:val}); }
  maxw(val) { return this.merge({maxWidth:val}); }
  minw(val) { return this.merge({minWidth:val}); }

  h(val) { return this.merge({height:val}); }
  maxh(val) { return this.merge({maxHeight:val}); }
  minh(val) { return this.merge({minHeight:val}); }


  /*

 * make a margin prop
 * @param arg string|number - if number, px, if string, direct
 * @param which string|empty - if empty, all margins, if string, one of t|b|l|r|v|h|x|y
 * 
  */
  m(arg?:any, which?: WhereKeyType) {
    if (!arg) {
      arg = "1em";
    }
    let mg = this.Class.mkMPBWhereProps('m', arg, which);
    _.merge(this.styleObj, mg);
    return this;
  }
  p(arg?:any, which?: WhereKeyType) {
    if (!arg) {
      arg = "1em";
    }
    let mg = this.Class.mkMPBWhereProps('p', arg, which);
    _.merge(this.styleObj, mg);
    return this;
  }

  // Border - make this better
  //br(color?: string, radius?: string|number, which?: WhereKeyType) {
  //br(color?: string, style?:string, radius?: string|number, which?: WhereKeyType) {
  static borderParamDefaults = {color:"#888", style:"solid", width:"1px" as string|number, radius:0 as string|number, which:null as null | WhereKeyType };
  br(borderParams:BorderParams = {}) {
  //  let defaults:BorderParams = {color:"#888", style:"solid", width:"1px", radius:0};
    let {color, style, radius, width, which} = {...(this.Class.borderParamDefaults), ...borderParams};
    let bpd = this.Class.borderParamDefaults;
    let tClass = this.Class;
    let toTC = typeOf(tClass);
    console.log("In BR:",{color, style, radius, width, which, bpd, tClass, toTC,});
    let settings = `${style} ${width} ${color}`;
    
    let ret: GenObj = {};
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
    } else {
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
  // Display - come up with clever args
  /**
   * Set the display
   * @param ...dispArgs - array of strings - keys to static:displays, or valid CSS display values
   * Merged together sequentially
   */
  d(...dispArgs) {
    let dispStyle: GenObj = {};
    for (let dispArg of dispArgs) {
      let toDA = typeof dispArg;
      if (toDA === "string") {
        if (dispArg in this.Class.displays) {
          _.merge(dispStyle, camelKeys(this.Class.displays[dispArg]));
        } else {
          console.error(`String dispArg [${dispArg}] not in disp keys`);
        }
      } else if (toDA === "object") { // Merge object
        _.merge(dispStyle, camelKeys(dispArg));
      } else {
        console.error(`Unhandled dispArg:`, { dispArg });
      }
    }
    //console.log(`About to create display:`, { dispStyle });
    return this.merge(dispStyle);
  }
}

/**
 * Laziness again - SB is just a new StyleBuilder instance
 */
//export const SB=StyleBuilder.builder; 

/**
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 *  - for now, just works for
 * top level args of type StyleBuilder
 * @param ...args - one or more StyleBuilder instances or style objects
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





















