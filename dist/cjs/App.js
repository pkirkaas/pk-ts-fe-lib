import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { startAvailableChecks, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js';
import styled from 'styled-components';
import { PanelSeparator, VPanelGroup, } from './components/formComponents.js';
import { SDiv, mkStyled, } from './components/formComponents.js';
import { Panel, } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Reset-Css-2023.css';
import './App.css';
import './tst.scss';
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
});
//@ts-ignore
//let ModStyled = FromStyled().css({ color: "green", background: "orange" });
//let ModStyled = styled(FromStyled).css({ color: "green", background: "orange" });
let ModStyled = styled(FromStyled).attrs({ aborder: "solid black 5px", theWidth: "450px", style: { color: "green", background: "orange", padding: "20px" } }) `font-weight: bold; color: red; font-style: italic; width: ${props => props.theWidth};  border: ${props => props['aborder']} `;
//({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props) => props.theWidth,  border: (props) => props['aborder'] });
//({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props => props.theWidth) ,  border: (props => props['aborder']) });
//({ fontWeight: "bold", color: "red", fontStyle: "italic", border: props['aborder'] });
// `font-weight:bold; color:red; font-style:italic;`;
//let ModStyled = styled.div.attrs({ color: "green", background: "orange" })`font-weight:bold;`;
//export { default as appCss } from  './App.css';
//export { default as resetCss } from './Reset-Css-2023.css'
function App() {
    const [count, setCount] = useState(0);
    let csshRef = getCssHrefs();
    let jsshRef = getJsHrefs();
    let intId = startAvailableChecks();
    return (_jsxs("div", { className: "App", children: [_jsx(SDiv, { children: "Who Knows" }), _jsx(FromStyled, { children: "I Know" }), _jsx(OromStyled, { children: "Abstracted" }), _jsx(ModStyled, { children: "Super Abstracted" }), _jsx("h1", { className: "gb", children: "Vite + React" }), _jsx("div", { children: "Testing Func Params" }), _jsxs("div", { className: "brdr", children: [_jsx("p", { children: " Testing components" }), _jsxs(VPanelGroup, { children: [_jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "First Panel" }) }), _jsx(PanelSeparator, {}), _jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "Second Panel" }) })] })] }), _jsx("div", { children: "END Testing Func Params" }), _jsx("div", { className: "card", children: _jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }) })] }));
}
export default App;
//# sourceMappingURL=App.js.map