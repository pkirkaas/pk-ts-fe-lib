import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { startAvailableChecks, getCssHrefs, getJsHrefs } from './libs/browserTweaks';
import { PanelSeparator, VPanelGroup, } from './components/formComponents';
import { Panel, } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Reset-Css-2023.css';
import './App.css';
//export { default as appCss } from  './App.css';
//export { default as resetCss } from './Reset-Css-2023.css'
function App() {
    const [count, setCount] = useState(0);
    let csshRef = getCssHrefs();
    let jsshRef = getJsHrefs();
    let intId = startAvailableChecks();
    return (_jsxs("div", { className: "App", children: [_jsx("h1", { children: "Vite + React" }), _jsx("div", { children: "Testing Func Params" }), _jsxs("div", { className: "brdr", children: [_jsx("p", { children: " Testing components" }), _jsxs(VPanelGroup, { children: [_jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "First Panel" }) }), _jsx(PanelSeparator, {}), _jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "Second Panel" }) })] })] }), _jsx("div", { children: "END Testing Func Params" }), _jsx("div", { className: "card", children: _jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }) })] }));
}
export default App;
//# sourceMappingURL=App.js.map