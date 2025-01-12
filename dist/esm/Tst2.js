import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SDiv, mkStyled, } from './components/formComponents.js';
import { PopupDialog, RButton, } from './index.js';
let FromStyled = mkStyled('div', {
    border: "solid green 3px",
    fontWeight: "bold",
    fontSize: "xx-large",
    color: 'blue',
    fontFamily: "courier"
});
export function Tst2() {
    const handleSave = (text) => {
        console.log('Saved text:', text);
    };
    const handleCancel = () => {
        console.log('Dialog cancelled');
    };
    return (_jsxs("div", { style: { backgroundColor: "red", border: "solid 1px green", width: "100%" }, children: [_jsx("h1", { children: "Tst2" }), _jsx(SDiv, { children: "Who Knows" }), _jsx(FromStyled, { children: "I Know" }), _jsxs("div", { className: "outline min-h-10 divide-y flex flex-col", children: [_jsx("div", { children: "Here and there" }), _jsx(RButton, { children: "Test" }), _jsx(PopupDialog, { title: "Test Popup", trigger: _jsx(RButton, { children: "Open Popup" }), defaultText: "Initial text", onSave: handleSave, onCancel: handleCancel })] })] }));
}
//# sourceMappingURL=Tst2.js.map