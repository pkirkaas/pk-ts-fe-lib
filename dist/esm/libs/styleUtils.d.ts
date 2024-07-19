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
import { GenObj } from 'pk-ts-common-lib';
/** Utility - if val a key of obj, return the value
 * for the key, else return val itself.
 * Purpose: To allow some shortcut keys for CSS values, like
 * {ai:'s'} for "alignItems:'flex-start'" - but also allow setting CSS values NOT
 * using the shortcut keys.
*/
export declare function valFromObj(val: any, obj: GenObj): any;
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
export declare class StyleBuilder {
    thisClass: any;
    static displays: {
        block: {
            display: string;
        };
        inline: {
            display: string;
        };
        fc: {
            display: string;
            flexDirection: string;
        };
        fr: {
            display: string;
            flexDirection: string;
        };
        w: {
            display: string;
            flexWrap: string;
        };
        nw: {
            display: string;
            flexWrap: string;
        };
        ais: {
            display: string;
            alignItems: string;
        };
        aic: {
            display: string;
            alignItems: string;
        };
        aig: {
            display: string;
            alignItems: string;
        };
        jcs: {
            display: string;
            justifyContent: string;
        };
        jcc: {
            display: string;
            justifyContent: string;
        };
        jcg: {
            display: string;
            justifyContent: string;
        };
    };
    /**
     * Shortcuts for flex displays - 4 keys:
     * fd - flex direction - r(row) or c (column)
     * wr - flex wrap - w(wrap) or nw (nowrap)
     * ai - align items - s(start), c(center), g(stretch)
     * jc - justify content - s(start), c(center), g(stretch)
     */
    static flexDisplays: {
        fd: {
            r: string;
            c: string;
        };
        wr: {
            w: string;
            n: string;
        };
        ai: {
            s: string;
            c: string;
            g: string;
        };
        jc: {
            s: string;
            c: string;
            g: string;
        };
    };
    static flexDisplayOpts: {
        fd: {
            prop: string;
            vals: {
                r: string;
                c: string;
            };
        };
        wr: {
            prop: string;
            vals: {
                w: string;
                n: string;
            };
        };
        ai: {
            prop: string;
            vals: {
                s: string;
                e: string;
                c: string;
                g: string;
                b: string;
            };
        };
        jc: {
            prop: string;
            vals: {
                s: string;
                c: string;
                e: string;
                b: string;
                a: string;
            };
        };
    };
    /**
     * Convenience method for flex displays
     * @param flexOpts? GenObj - object w. flex opt keys and values
     * opt keys: fd (flex-direction), wr (wrap), ai (alignItems), jc (justifyContent)
     * opt key vals - shortcut key into vals, or string value
     */
    flex(flexOpts?: GenObj): this;
    /**
     * flex align-items -
     * @param align:string - one of s,c,g or full css align value
     */
    flexa(val?: string): this;
    flexj(val?: string): this;
    flexd(val?: string): this;
    flexw(val?: string): this;
    get camelled(): GenObj;
    static fgBgPairs: {
        1: {
            fg: string;
            bg: string;
        };
        2: {
            fg: string;
            bg: string;
        };
        3: {
            fg: string;
            bg: string;
        };
        blwh: {
            fg: string;
            bg: string;
        };
        rdwh: {
            fg: string;
            bg: string;
        };
    };
    static fontSizeMap: {
        xxs: string;
        xs: string;
        s: string;
        sm: string;
        m: string;
        md: string;
        l: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        smaller: string;
        larger: string;
    };
    static whereKeys: {
        t: string;
        b: string;
        l: string;
        r: string;
        v: string[];
        y: string[];
        h: string[];
        x: string[];
    };
    static bpmKeys: {
        m: string;
        p: string;
        b: string;
    };
    /**
     * Makes a style object for margin/padding/border
     * @propBase - m,b,p
     * @val - the value
     * @key opt - one of the keys for whereKeys 't','b','x','y', etc
     * @return - basic object w. css style props/vals
     */
    static mkMPBWhereProps(propBase: any, val: any, key: any): GenObj;
    /**
     * static builder & build(args) - to avoid `(new StyleBuilder(...args)).chain1(1)...etc`
     */
    static get builder(): StyleBuilder;
    static build(...args: any[]): StyleBuilder;
    styleObj: GenObj;
    constructor(...sos: any[]);
    get style(): GenObj;
    get className(): string;
    get clone(): any;
    merge(...objs: any[]): this;
    add(key: any, value: any): this;
    nest(key: any, value: any): this;
    ta(align?: string): this;
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
    fgbg(pair: any, invert?: boolean): this;
    /**
     * Inner Border
     */
    ib(color?: string, spread?: number): this;
    fs(sz: any): this;
    w(val: any): this;
    maxw(val: any): this;
    minw(val: any): this;
    h(val: any): this;
    maxh(val: any): this;
    minh(val: any): this;
    m(arg: any, which?: string): this;
    p(arg: any, which?: string): this;
    br(color?: string, radius?: any): this;
    fw(weight: any): this;
    c(color: any): this;
    bg(color: any): this;
    /**
     * Set the display
     * @param ...dispArgs - array of strings - keys to static:displays, or valid CSS display values
     * Merged together sequentially
     */
    d(...dispArgs: any[]): this;
}
/**
 * Laziness again - SB is just a new StyleBuilder instance
 */
export declare const SB: StyleBuilder;
/**
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 *  - for now, just works for
 * top level args of type StyleBuilder
 * @param ...args -
 */
export declare function cxsb(...args: any[]): string;
export declare function mkStyle(args: any): string;
//# sourceMappingURL=styleUtils.d.ts.map