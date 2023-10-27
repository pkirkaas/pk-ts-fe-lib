import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { startAvailableChecks, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js';
import { PanelSeparator, } from './components/formComponents.jsx';
import { Panel, PanelGroup, } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
function App() {
    const [count, setCount] = useState(0);
    let csshRef = getCssHrefs();
    let jsshRef = getJsHrefs();
    let intId = startAvailableChecks();
    return (_jsxs("div", { className: "App", children: [_jsx("div", {}), _jsx("h1", { children: "Vite + React" }), _jsx("div", { children: "Testing Func Params" }), _jsxs("div", { className: "brdr", children: [_jsx("p", { children: " Testing components" }), _jsxs(PanelGroup, { direction: "vertical", children: [_jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "First Panel" }) }), _jsx(PanelSeparator, {}), _jsx(Panel, { className: "brnm", minSize: 25, children: _jsx("h1", { children: "Second Panel" }) })] })] }), _jsx("div", { children: "END Testing Func Params" }), _jsxs("div", { className: "card", children: [_jsxs("button", { onClick: () => setCount((count) => count + 1), children: ["count is ", count] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to test HMR"] }), "diT"] }), _jsx("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })] }));
}
export default App;
//# sourceMappingURL=App.js.map