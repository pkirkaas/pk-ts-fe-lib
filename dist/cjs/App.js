import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { startAvailableChecks, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js';
//import styled  from 'styled-components';
import { styled } from 'styled-components';
import { PanelSeparator, VPanelGroup, } from './components/formComponents.js';
import { SDiv, mkStyled, } from './components/formComponents.js';
import { Panel, } from "react-resizable-panels";
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
function App() {
    const [count, setCount] = useState(0);
    let csshRef = getCssHrefs();
    let jsshRef = getJsHrefs();
    let intId = startAvailableChecks();
    /*
    return (<div>Empty App</div>);
    */
    return (_jsxs("div", { className: "App fullw", children: [_jsx(SDiv, { children: "Who Knows" }), _jsx(FromStyled, { children: "I Know" }), _jsx(OromStyled, { children: "Abstracted" }), _jsx(ModStyled2, { "$background": "#aaf", "$color": "orange", style: { width: 400 }, children: "Super Abstracted" }), _jsx("h1", { className: "gb", children: "Vite + React" }), _jsx("div", { children: "Testing Func Params" }), _jsxs("div", { className: "brdr", children: [_jsx("p", { children: " Testing components" }), _jsxs(VPanelGroup, { children: [_jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "First Panel" }) }), _jsx(PanelSeparator, {}), _jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "Second Panel" }) })] })] }), _jsx("div", { children: "END Testing Func Params" }), _jsx("div", { className: "card", children: _jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }) })] }));
}
export default App;
//# sourceMappingURL=App.js.map