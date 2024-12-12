import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SDiv, mkStyled, } from './components/formComponents.js';
let FromStyled = mkStyled('div', {
    border: "solid green 3px",
    fontWeight: "bold",
    fontSize: "xx-large",
    color: 'blue',
    fontFamily: "courier"
});
export function Tst2() {
    return (_jsxs("div", { style: { backgroundColor: "red", border: "solid 1px green", width: "100%" }, children: [_jsx("h1", { children: "Tst2" }), _jsx(SDiv, { children: "Who Knows" }), _jsx(FromStyled, { children: "I Know" })] }));
}
//# sourceMappingURL=Tst2.js.map