import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Button, Dropdown, Menu } from 'react-daisyui';
/**
 * Renders a single menu item
 * @param item - Navigation item to render
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenuItem = (item, isDropdown) => {
    const content = (_jsxs(_Fragment, { children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), item.label] }));
    if (item.children) {
        if (isDropdown) {
            return (_jsxs("li", { children: [_jsxs("button", { className: "btn btn-ghost btn-sm w-full justify-between", onClick: (e) => {
                            e.preventDefault();
                            // Toggle the dropdown
                            const dropdown = e.currentTarget.nextElementSibling;
                            if (dropdown) {
                                dropdown.classList.toggle('hidden');
                            }
                        }, children: [content, _jsx("svg", { className: "fill-current", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", children: _jsx("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }) })] }), _jsx("ul", { className: "p-2 hidden", children: item.children.map((child) => renderMenuItem(child, isDropdown)) })] }, item.label));
        }
        return (_jsx(Menu.Item, { children: _jsxs("details", { children: [_jsx("summary", { children: content }), _jsx("ul", { className: "p-2", children: item.children.map((child) => renderMenuItem(child, isDropdown)) })] }) }, item.label));
    }
    if (typeof item.action === 'string') {
        // If action is a string, treat it as an href
        if (isDropdown) {
            return (_jsx(Dropdown.Item, { children: _jsx("a", { href: item.action, children: content }) }, item.label));
        }
        return (_jsx(Menu.Item, { children: _jsx("a", { href: item.action, children: content }) }, item.label));
    }
    else if (typeof item.action === 'function') {
        // If action is a function, use it as an onClick handler
        if (isDropdown) {
            return (_jsx(Dropdown.Item, { children: _jsx("button", { onClick: item.action, children: content }) }, item.label));
        }
        return (_jsx(Menu.Item, { children: _jsx("button", { onClick: item.action, children: content }) }, item.label));
    }
    // If no action is provided, render as a disabled item
    if (isDropdown) {
        return (_jsx(Dropdown.Item, { disabled: true, children: content }, item.label));
    }
    return (_jsx(Menu.Item, { disabled: true, children: content }, item.label));
};
/**
 * Renders the menu structure for both dropdown and full menu
 * @param items - Array of navigation items
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenu = (items, isDropdown) => {
    return items.map((item) => renderMenuItem(item, isDropdown));
};
/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export const PkNavbar = ({ brand, items, endContent, className = '', breakpoint = 'lg', renderMenuItem: customRenderMenuItem, }) => {
    const renderItem = customRenderMenuItem || renderMenuItem;
    return (_jsxs(Navbar, { className: className, children: [_jsxs(Navbar.Start, { children: [_jsxs(Dropdown, { children: [_jsx(Button, { tag: "label", color: "ghost", tabIndex: 0, className: `${breakpoint}:hidden`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h8m-8 6h16" }) }) }), _jsx(Dropdown.Menu, { tabIndex: 0, className: "w-52 menu-sm mt-3 z-[1]", children: renderMenu(items, true) })] }), brand] }), _jsx(Navbar.Center, { className: `hidden ${breakpoint}:flex`, children: _jsx(Menu, { horizontal: true, className: "px-1", children: renderMenu(items, false) }) }), endContent && _jsx(Navbar.End, { children: endContent })] }));
};
//# sourceMappingURL=gemnav.js.map