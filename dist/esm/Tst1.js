import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// NPM packages
import { useState } from 'react';
import { startAvailableChecks, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js';
//import styled  from 'styled-components';
import { styled } from 'styled-components';
import { Panel, } from "react-resizable-panels";
// Local Imports
import { PanelSeparator, VPanelGroup, } from './components/index.js';
import { SDiv, mkStyled, } from './components/formComponents.js';
import { H1 } from './index.js';
import '../scss/pk-default.scss';
let OromStyled = mkStyled(SDiv, {
    border: "solid black 3px",
    fontWeight: "bold",
    fontSize: "xx-large",
    color: 'red',
    background: "#ddd",
});
let FromStyled = mkStyled('div', {
    border: "solid green 3px",
    fontWeight: "bold",
    fontSize: "xx-large",
    color: 'blue',
    fontFamily: "courier"
});
/*
*/
//@ts-ignore
//let ModStyled = FromStyled().css({ color: "green", background: "orange" });
//let ModStyled = styled(FromStyled).css({ color: "green", background: "orange" });
//let ModStyled = styled(FromStyled).attrs(props => ({ aborder: "solid black 5px", $thewidth: "450px", } ))
//  `font-weight: bold; color: red; font-style: italic; width: ${props => props.$thewidth};  border: ${props => props.aborder}; `;
//`font-weight: bold; color: red; font-style: italic; width: ${props => props.thewidth};  border: ${props => props['aborder']} `;
//({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props) => props.thewidth,  border: (props) => props['aborder'] });
//({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props => props.thewidth) ,  border: (props => props['aborder']) });
//({ fontWeight: "bold", color: "red", fontStyle: "italic", border: props['aborder'] });
//let ModStyled = styled.div.attrs<{ $background?: string, $fontsize?:string, }>
//let ModStyled = styled.div.attrs<GenObj>(props => ({
/*
let ModStyled = styled(FromStyled).attrs<GenObj>(props => ({
  $background: props.$background || "yellow",
  $fontsize: props.$fontsize || "xx-large",
  $color: props.$color || "green",
})) `
  border: solid red 5px;
  background-color:${props => props.$background};
  font-size:${props => props.$fontsize};
  color: ${props => props.$color};
  font-weight: bold;
  `
  */
//let ModStyled = styled(FromStyled).attrs<GenObj>(props => ({
let ModStyled2 = styled(FromStyled).attrs(props => ({
    $background: props.$background || "yellow",
    $fontsize: props.$fontsize || "xx-large",
    $color: props.$color || "green",
    //@ts-ignore
}))({
    border: "solid green 5px",
    backgroundColor: props => props.$background,
    fontSize: props => props.$fontsize,
    color: props => props.$color,
    fontWeight: "bold",
});
/*
*/
// Experiment w. building custom components w. StyleBuilder & withStyled
/*
export function H1() {
  let h1Style={ fontWeight: "bold", border:"solid green 4px", color: "red", fontStyle: "italic" };
  return withStyled(h1Style, "h1");
   
}

export let H1 = withStyled({ fontWeight: "bold", margin:5, padding:5, border:"solid green 4px", color: "red", fontStyle: "italic" }, "h1");
  */
// `font-weight:bold; color:red; font-style:italic;`;
//let ModStyled = styled.div.attrs({ color: "green", background: "orange" })`font-weight:bold;`;
//export { default as appCss } from  './App.css';
//export { default as resetCss } from './Reset-Css-2023.css'
export function Tst1() {
    const [count, setCount] = useState(0);
    let csshRef = getCssHrefs();
    let jsshRef = getJsHrefs();
    let intId = startAvailableChecks();
    /*
    return (<div>Empty App</div>);
    */
    return (_jsxs("div", { className: "App fullw", children: [_jsx(H1, { children: "Tst1" }), _jsx(SDiv, { children: "Who Knows" }), _jsx(FromStyled, { children: "I Know" }), _jsx(OromStyled, { children: "Abstracted" }), _jsx(ModStyled2, { "$background": "#aaf", "$color": "orange", style: { width: 400 }, children: "Super Abstracted" }), _jsx("h1", { className: "gb", children: "Vite + React" }), _jsx("div", { children: "Testing Func Params" }), _jsxs("div", { className: "brdr", children: [_jsx("p", { children: " Testing components" }), _jsxs(VPanelGroup, { children: [_jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "First Panel" }) }), _jsx(PanelSeparator, {}), _jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "Second Panel" }) })] })] }), _jsx("div", { children: "END Testing Func Params" }), _jsx("div", { className: "card", children: _jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }) })] }));
}
export default Tst1;
//# sourceMappingURL=Tst1.js.map