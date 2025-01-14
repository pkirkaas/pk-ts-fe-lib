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
import { GenObj, Scalar } from 'pk-ts-common-lib';
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
export type FontFamily = keyof typeof StyleBuilder.fontFamilies;
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
    styleObj: GenObj;
    constructor(...sos: any[]);
    get Class(): any;
    get style(): import("pk-ts-common-lib").GenericObject;
    get className(): string;
    get clone(): any;
    get camelled(): import("pk-ts-common-lib").GenericObject;
    get fullw(): this;
    get fullh(): this;
    get full(): this;
    /**
     * Convenience method for flex displays
     * @param flexOpts? GenObj - object w. flex opt keys and values
     * opt keys: fd (flex-direction), wr (wrap), ai (alignItems), jc (justifyContent)
     * opt key vals - shortcut key into vals, or string value
     */
    flex(flexOpts?: StyleBuilderFlexArgs): this;
    toString(): string;
    classNames(...args: any[]): string;
    merge(...objs: any[]): this;
    add(key: any, value: any): this;
    nest(key: any, value: any): this;
    ta(align?: AlignType): this;
    ff(fontFamily: FontFamily): this;
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
    fgbg(pair: string | string[] | number | GenObj, invert?: boolean): this;
    /**
     * Inner Border
     */
    ib(color?: string, spread?: number): this;
    fs(sz: Scalar): this;
    w(val: Scalar): this;
    maxw(val: Scalar): this;
    minw(val: Scalar): this;
    h(val: Scalar): this;
    maxh(val: Scalar): this;
    minh(val: Scalar): this;
    m(arg?: Scalar, which?: WhereKeyType): this;
    mv(arg?: Scalar): this;
    mh(arg?: Scalar): this;
    p(arg?: Scalar, which?: WhereKeyType): this;
    pv(arg?: Scalar): this;
    ph(arg?: Scalar): this;
    br(borderParams?: BorderParams | string): this;
    fw(weight: any): this;
    c(color: any): this;
    bg(color: any): this;
    /**
     * Set display
     * @param arg - string or StyleBuilderFlexArgs - see StyleBuilderFlexArgs
     * if string, 'i' | 'inline' | 'b' | 'block', else flex
     */
    d(arg: string | StyleBuilderFlexArgs): this;
    /**
     * Makes a style object for margin/padding/border
     * @propBase - m,b,p
     * @val - the value
     * @key opt - one of the keys for whereKeys 't','b','x','y', etc
     * @return - basic object w. css style props/vals
     */
    static mkMPBWhereProps(propBase: BmpKeys, val?: string, key?: WhereKeyType): import("pk-ts-common-lib").GenericObject;
    /**
     * static builder & build(args) - to avoid `(new StyleBuilder(...args)).chain1(1)...etc`
     */
    static build(...args: any[]): StyleBuilder;
    static get builder(): StyleBuilder;
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
    static fontFamilies: {
        v: string;
        verdana: string;
        c: string;
        courier: string;
        l: string;
        lucidia: string;
        t: string;
        timtes: string;
        r: string;
        roboto: string;
        a: string;
        arial: string;
        h: string;
        helvetica: string;
    };
    static borderParamDefaults: {
        color: string;
        style: string;
        width: string | number;
        radius: string | number;
        which: null | WhereKeyType;
    };
    static aligns: {
        c: string;
        l: string;
        r: string;
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
}
/**
 * Merge multiple style objects into one - also StyleBuilder instances and "props.style" if present
 */
export declare function pkStyles(...args: any[]): import("pk-ts-common-lib").GenericObject;
/**
 * Laziness again - SB is just a new StyleBuilder instance
 */
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
 * Usage in component:
 * <div className={cxsb(sb1,{color:"red",fontSize:"2em"})}>...</div>
 */
export declare function cxsb(...args: any[]): string;
/**
 * Try to emulate the @emotion/react/css function, which accepts styles, but extend to use
 * SB instances, like cxsb above
 * Use in custom components with the css prop - css={csssb(styles)}
 */
export declare function csssb(...args: any[]): import("@emotion/serialize").SerializedStyles;
//# sourceMappingURL=styleUtils.d.ts.map