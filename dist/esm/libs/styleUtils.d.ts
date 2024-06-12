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
import { GenObj } from 'pk-ts-common-lib';
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
            "flex-direction": string;
        };
        fr: {
            display: string;
            "flex-direction": string;
        };
        w: {
            display: string;
            "flex-wrap": string;
        };
        nw: {
            display: string;
            "flex-wrap": string;
        };
        ais: {
            display: string;
            "align-items": string;
        };
        aic: {
            display: string;
            "align-items": string;
        };
        aig: {
            display: string;
            "align-items": string;
        };
        jcs: {
            display: string;
            "justify-content": string;
        };
        jcc: {
            display: string;
            "justify-content": string;
        };
        jcg: {
            display: string;
            "justify-content": string;
        };
    };
    static flexDisplays: {
        fd: {
            r: {
                display: string;
                "flex-direction": string;
            };
            c: {
                display: string;
                "flex-direction": string;
            };
        };
        wr: {
            w: {
                display: string;
                "flex-wrap": string;
            };
            n: {
                display: string;
                "flex-wrap": string;
            };
        };
        ai: {
            s: {
                display: string;
                "align-items": string;
            };
            c: {
                display: string;
                "align-items": string;
            };
            g: {
                display: string;
                "align-items": string;
            };
        };
        jc: {
            s: {
                display: string;
                "justify-content": string;
            };
            c: {
                display: string;
                "justify-content": string;
            };
            g: {
                display: string;
                "justify-content": string;
            };
        };
    };
    /** SO BAD! */
    /**
     * Convenience method for flex displays
     */
    flex(flexOpts?: GenObj): this;
    get camelled(): GenObj;
    static ltDrkColorPairs: {
        1: {
            dark: string;
            light: string;
        };
        2: {
            dark: string;
            light: string;
        };
        3: {
            dark: string;
            light: string;
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
     * @key opt - one of the keys for whereKeys
     * @return - basic object w. css style props/vals
     */
    static mkMPBWhereProps(propBase: any, val: any, key: any): GenObj;
    static get builder(): StyleBuilder;
    styleObj: GenObj;
    constructor(...sos: any[]);
    get style(): GenObj;
    get className(): string;
    get clone(): any;
    merge(...objs: any[]): this;
    add(key: any, value: any): this;
    nest(key: any, value: any): this;
    ta(align: any): this;
    /**
     * Make forground/background color pairs from the list
     * @param key - key of ltDrkColorPairs. If numeric & negative, invert true
     * @param invert boolean - invert the light/dark?
     *
     */
    fgbg(key: any, invert?: boolean): this;
    /**
     * Inner Border
     */
    ib(color?: string, spread?: number): this;
    fs(sz: any): this;
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
 * Enhances Emotion CX by accepting StyleBuilder args
 * and created classNames from them to add.
 * TODO: Make more nested, and accept generic JS style objects
 *  - for now, just works for
 * top level args of type StyleBuilder
 */
export declare function cxsb(...args: any[]): string;
export declare function mkStyle(args: any): string;
//# sourceMappingURL=styleUtils.d.ts.map