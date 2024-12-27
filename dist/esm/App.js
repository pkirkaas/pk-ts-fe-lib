import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Responsive, PkNavbar, } from './components/index.js';
import { Tst1 } from './Tst1.js';
import { Tst2 } from './Tst2.js';
import { Panels } from './Panels.js';
import { TailwindPlay } from './TailwindPlay.js';
import { BuildRoutes, RespNav, } from './react-utils/index.js';
//import styled  from 'styled-components';
import '../scss/pk-default.scss';
let menuItems = [
    { label: "Home", action: "/" },
    { label: "Subpage", action: "/subpage" },
    { label: "Async RSC", action: "/rscasync" },
    { label: "Panels?", action: "/panels" },
];
export const rNavVals = {
    about: { path: '/', label: "Tst1", component: Tst1, },
    gallery: { path: '/tst2', label: "Tst2", component: Tst2 },
    panels: { path: '/panels', label: "Panels", component: Panels },
    tailplay: { path: '/tailwindplay', label: "Tailwind Play", component: TailwindPlay },
};
function App(props) {
    //<div className='tsttw'>Testing Tailwind</div> (check if tailwind.css is loaded)
    // <h1 className="text-3xl font-bold underline text-center">
    return (_jsx("div", { id: "app-id", ...props, children: _jsxs(Container, { fluid: true, children: [_jsx("h1", { className: "tsth1", children: "Hello world!" }), _jsx("h2", { children: "PkNav Below" }), _jsx("hr", {}), _jsx(PkNavbar, { className: "w-full border text-black  border-green-600", breakpoint: "sm", items: menuItems }), _jsx("hr", {}), _jsx(Responsive, {}), _jsx(BrowserRouter, { children: _jsxs(_Fragment, { children: [RespNav(rNavVals), _jsx("div", { className: " p-16 border border-blue-200 bg-red-100 ", children: BuildRoutes(rNavVals) })] }) })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map