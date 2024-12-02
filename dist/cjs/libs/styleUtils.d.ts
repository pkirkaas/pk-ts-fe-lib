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
import { GenObj } from 'pk-ts-common-lib';
export interface StyleBuilderFlexArgs {
    fd?: 'r' | 'c';
    wr?: 'w' | 'n';
    ai?: 's' | 'e' | 'c' | 'g' | 'b';
    jc?: 's' | 'c' | 'e' | 'b' | 'a';
}
export type BmpKeys = 'm' | 'p' | 'b';
export type BorderParams = Partial<typeof StyleBuilder.borderParamDefaults>;
export type WhereKeyType = keyof typeof StyleBuilder.whereKeys;
export type AlignType = keyof typeof StyleBuilder.aligns;
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
    get Class(): any;
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
    flex(flexOpts?: StyleBuilderFlexArgs): this;
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
        4: {
            fg: string;
            bg: string;
        };
        5: {
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
    static mkMPBWhereProps(propBase: BmpKeys, val?: string, key?: WhereKeyType): GenObj;
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
    static aligns: {
        c: string;
        l: string;
        r: string;
    };
    ta(align?: AlignType): this;
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
    fgbg(pair: string | string[] | number | GenObj, invert?: boolean): this;
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
    m(arg?: any, which?: WhereKeyType): this;
    p(arg?: any, which?: WhereKeyType): this;
    static borderParamDefaults: {
        color: string;
        style: string;
        width: string | number;
        radius: string | number;
        which: null | WhereKeyType;
    };
    br(borderParams?: BorderParams): this;
    fw(weight: any): this;
    c(color: any): this;
    bg(color: any): this;
    /**
     * Set display
     * @param arg - string or StyleBuilderFlexArgs - see StyleBuilderFlexArgs
     * if string, 'i' | 'inline' | 'b' | 'block', else flex
     */
    d(arg: string | StyleBuilderFlexArgs): this;
}
/**
 * Laziness again - SB is just a new StyleBuilder instance
 */
/**
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 *  - for now, just works for
 * top level args of type StyleBuilder
 * @param ...args - one or more StyleBuilder instances or style objects
 */
export declare function cxsb(...args: any[]): string;
/**
 * Try to emulate the @emotion/react/css function, which accepts styles, but extend to use
 * SB instances, like cxsb above
 * Use in custom components with the css prop - css={csssb(styles)}
 */
export declare function csssb(...args: any[]): import("@emotion/serialize").SerializedStyles;
//# sourceMappingURL=styleUtils.d.ts.map