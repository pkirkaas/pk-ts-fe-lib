/** Anthropic DaisyReact Navbar */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Button, Dropdown, Menu } from 'react-daisyui';
/**
 * Renders a recursive menu structure for both dropdown and full menu
 * @param items - Array of navigation items
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenuItems = (items, isDropdown) => {
    return items.map((item) => {
        if (item.children) {
            if (isDropdown) {
                return (_jsxs("li", { children: [_jsxs("a", { children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }), _jsx("ul", { className: "p-2", children: item.children.map((child) => (_jsx("li", { children: _jsxs("a", { href: child.href, children: [child.icon && _jsx("span", { className: "mr-2", children: child.icon }), child.label] }) }, child.label))) })] }, item.label));
            }
            return (_jsx(Menu.Item, { children: _jsxs("details", { children: [_jsxs("summary", { children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }), _jsx("ul", { className: "p-2", children: item.children.map((child) => (_jsx(Menu.Item, { children: _jsxs("a", { href: child.href, children: [child.icon && _jsx("span", { className: "mr-2", children: child.icon }), child.label] }) }, child.label))) })] }) }, item.label));
        }
        if (isDropdown) {
            return (_jsx(Dropdown.Item, { children: _jsxs("a", { href: item.href, children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }) }, item.label));
        }
        return (_jsx(Menu.Item, { children: _jsxs("a", { href: item.href, children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }) }, item.label));
    });
};
/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export const PkNavbar = ({ brand, items, endContent, className = '', breakpoint = 'lg' }) => {
    return (_jsxs(Navbar, { className: className, children: [_jsxs(Navbar.Start, { children: [_jsxs(Dropdown, { children: [_jsx(Button, { tag: "label", color: "ghost", tabIndex: 0, className: `${breakpoint}:hidden`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h8m-8 6h16" }) }) }), _jsx(Dropdown.Menu, { tabIndex: 0, className: "w-52 menu-sm mt-3 z-[1]", children: renderMenuItems(items, true) })] }), brand] }), _jsx(Navbar.Center, { className: `hidden ${breakpoint}:flex`, children: _jsx(Menu, { horizontal: true, className: "px-1", children: renderMenuItems(items, false) }) }), endContent && _jsx(Navbar.End, { children: endContent })] }));
};
//# sourceMappingURL=anavbar.js.map