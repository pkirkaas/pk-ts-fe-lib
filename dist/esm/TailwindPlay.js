import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Experimental Tailwind Playground
 */
import { PkNavbar } from './components/daisyui/index.js';
//} from './components/daisyui/anavbar.js';
//} from '@/components/daisyui/index.js';
//const navigationItems: NavItem[] = [
const navigationItems = [
    {
        label: 'Home',
        action: '/',
        // icon: <HomeIcon />, // Example icon component
    },
    {
        label: 'Products',
        children: [
            {
                label: 'Hardware',
                action: '/products/hardware',
            },
            {
                label: 'Software',
                action: '/products/software',
            },
        ],
    },
    {
        label: 'About',
        action: '/about',
    },
];
export function TailwindPlay() {
    return (_jsxs("div", { style: { background: "#faf", width: "100%", margin: 5, padding: 5, border: "solid red 1px", height: "100vh" }, children: [_jsx(PkNavbar, { style: { border: "solid red 2px" }, items: navigationItems }), _jsx("h1", { className: "tsth1", children: "Tailwind Playground" })] }));
}
//# sourceMappingURL=TailwindPlay.js.map