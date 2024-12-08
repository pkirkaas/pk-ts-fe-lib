/**
 * HOC component builder - build styled components on top of other styled components
 * DEPENDS ON @emotion/react & the @emotion/react pragmas!
 *
 * @param styles - object or object[], of regular style objects or StyleBuilder instances
 * @param Base? - an html element/string or a react component
 * @return a styled react component based on the Base component
 *
 * ACTUALLY WORKS!
let bs1 = StyleBuilder.builder.br('red', 5).ta('c').c('blue').fw('bold').fs('lg');
let bsMod = StyleBuilder.builder.m(10).p(10).fs('xxl').c('green');;
let Bs1 = withStyled(bs1);
let BsMod = withStyled(bsMod, Bs1);
 */
export declare const withStyled: (styles: any, Base?: any) => (props: any) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const withSBox: (styles: any, Base?: any) => (props: any) => import("@emotion/react/jsx-runtime").JSX.Element;
export declare const withMBox: (styles: any, Base?: any) => (props: any) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=muiUtils.d.ts.map