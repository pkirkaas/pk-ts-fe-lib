import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Container from 'react-bootstrap/Container';
import { BrowserRouter } from 'react-router-dom';
import { Tst1 } from './Tst1.js';
import { Tst2 } from './Tst2.js';
import { BuildRoutes, RespNav, } from './react-utils/index.js';
//import styled  from 'styled-components';
import '../scss/pk-default.scss';
export const rNavVals = {
    about: { path: '/', label: "Tst1", component: Tst1, },
    gallery: { path: '/tst2', label: "Tst2", component: Tst2 },
};
function App(props) {
    return (_jsx("div", { id: "app-id", ...props, children: _jsx(Container, { fluid: true, children: _jsx(BrowserRouter, { children: _jsxs(_Fragment, { children: [RespNav(rNavVals), _jsx("div", { className: " p-16 border border-blue-200 bg-red-100 ", children: BuildRoutes(rNavVals) })] }) }) }) }));
}
export default App;
//# sourceMappingURL=App.js.map