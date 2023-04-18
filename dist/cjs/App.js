"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_svg_1 = __importDefault(require("./assets/react.svg"));
const vite_svg_1 = __importDefault(require("/vite.svg"));
require("./App.css");
function App() {
    const [count, setCount] = (0, react_1.useState)(0);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://vitejs.dev", target: "_blank" }, { children: (0, jsx_runtime_1.jsx)("img", { src: vite_svg_1.default, className: "logo", alt: "Vite logo" }) })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://reactjs.org", target: "_blank" }, { children: (0, jsx_runtime_1.jsx)("img", { src: react_svg_1.default, className: "logo react", alt: "React logo" }) }))] }), (0, jsx_runtime_1.jsx)("h1", { children: "Vite + React" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "card" }, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ onClick: () => setCount((count) => count + 1) }, { children: ["count is ", count] })), (0, jsx_runtime_1.jsxs)("p", { children: ["Edit ", (0, jsx_runtime_1.jsx)("code", { children: "src/App.tsx" }), " and save to test HMR"] })] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "read-the-docs" }, { children: "Click on the Vite and React logos to learn more" }))] })));
}
exports.default = App;
//# sourceMappingURL=App.js.map