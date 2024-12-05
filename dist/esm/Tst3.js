import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Testing resize comps
import { Panel, } from "react-resizable-panels";
import { H1 } from './index.js';
import { SDiv, HPanelGroup, ResizeHandle, } from './components/index.js';
export function Tst3() {
    return (_jsxs("div", { style: { backgroundColor: "#fee", border: "solid 1px green", width: "100%" }, children: [_jsx(H1, { children: "Tst3" }), _jsx(SDiv, { children: "Who Knows" }), _jsx(H1, { children: "Start of HPanel Group" }), _jsxs(HPanelGroup, { minSize: 300, style: { border: "solid 1px green", width: "100%" }, children: [_jsx(Panel, { defaultSize: 30, style: { background: 'red', minHeight: "30px" }, children: _jsx("div", { children: "An HPanelItem" }) }), _jsx(ResizeHandle, {}), _jsx(Panel, { defaultSize: 30, style: { background: 'green', minHeight: "30px" }, children: _jsx("div", { children: "Another HPanel Item" }) })] })] }));
}
//# sourceMappingURL=Tst3.js.map