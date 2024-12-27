import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Testing resize comps
//import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";
import { TstTw, } from './index.js';
import { SDiv, Panel, VPanelGroup, HPanelGroup, } from './components/index.js';
export function Panels() {
    return (_jsxs("div", { style: { backgroundColor: "#fee", border: "solid 1px green", }, children: [_jsx("h1", { children: "Tst3" }), _jsx(TstTw, {}), _jsx(SDiv, { children: "Who Knows" }), _jsx("h1", { children: "Start of HPanel Group" }), _jsxs(HPanelGroup, { style: { border: "solid 1px green" }, children: [_jsx(Panel, { defaultSize: 50, style: { background: 'red', minHeight: "30px" }, children: _jsx("div", { style: { border: "solid red 3px" }, children: "An HPanelItem" }) }), _jsx(Panel, { style: { background: 'green', minHeight: "30px" }, children: _jsx("div", { children: "Another HPanel Item" }) }), _jsx(Panel, { children: _jsx("div", { style: { background: "#EFE" }, children: "Third HPanel Item" }) })] }), _jsx("h1", { children: "Start of VPanel Group" }), _jsxs(VPanelGroup, { style: { minHeight: "300px", border: "solid 1px green", }, children: [_jsx(Panel, { style: { background: 'red', }, children: _jsx("div", { style: { background: "#EFE" }, children: "First V Panel Item" }) }), _jsx(Panel, { style: { minHeight: "100px", background: 'green', }, children: _jsx("div", { style: { background: "#EEF" }, children: "Second V Panel Item" }) })] })] }));
}
//# sourceMappingURL=Panels.js.map