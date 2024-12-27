/** Blended Gemini/OAI/Anthropic Etc proposed NavBar for DaisyUI */
/**
 * Main exports:
 * @typedef NavItem
 * @description Represents a single navigation item with
 *   label,
 *   action: string or JS Function
 *   icon?,
 *   children?: NavItem[]
 *   className?
 *
 * PkNavbar - A responsive navbar component using DaisyUI
 * Only required prop: items: NavItem[]
 * Can accept brand, endContent, className, breakpoint, theme
 *
 * Usage:
 * export default function Home() {
 * return (
 *   <PkNavbar
 *     brand={<span className="text-xl font-bold">Logo</span>}
 *     items={navItems}
 *     endContent={<button className="btn btn-primary">Login</button>}
 *   />
 * );
 */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Button, Dropdown } from 'react-daisyui';
export const Chevron = ({ className = '' }) => (_jsx("span", { className: `ml-1 ${className}`, children: "\u25BE" }));
export const MenuItem = ({ item, isDropdown = false }) => {
    const handleClick = (e) => {
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        if (typeof item.action === 'function') {
            item.action();
        }
    };
    const baseClassName = `
    ${item.className || ''}
    ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isDropdown ? 'p-2 hover:bg-base-200 w-full text-left' : 'btn btn-ghost normal-case'}
    flex items-center justify-between
  `;
    const renderContent = () => (_jsxs(_Fragment, { children: [_jsx("span", { children: item.label }), item.children && _jsx(Chevron, {})] }));
    if (item.children) {
        return (_jsxs("div", { className: "dropdown dropdown-hover", children: [_jsx("button", { className: baseClassName, children: renderContent() }), _jsx("ul", { className: "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52", children: item.children.map((child) => (_jsx(MenuItem, { item: child, isDropdown: true }, child.label))) })] }));
    }
    if (typeof item.action === 'string') {
        return (_jsx("a", { href: item.action, className: baseClassName, onClick: handleClick, children: renderContent() }));
    }
    return (_jsx("button", { className: baseClassName, onClick: handleClick, disabled: item.disabled, children: renderContent() }));
};
//className={`${breakpoint}:hidden`}
//<Navbar.Center className={`hidden ${breakpoint}:flex gap-2`}>
export const PkNavbar = ({ brand, items, endContent, style, className = '', breakpoint = 'lg' }) => {
    let cnButton = `${breakpoint}:hidden`;
    let cnNav = `hidden ${breakpoint}:flex gap-2`;
    //  console.log({cnButton, cnNav});
    return (_jsxs(Navbar, { className: className, style: style, children: [_jsxs(Navbar.Start, { children: [_jsxs(Dropdown, { children: [_jsx(Button, { tag: "label", color: "ghost", tabIndex: 0, className: cnButton, children: "\u2630" }), _jsx(Dropdown.Menu, { tabIndex: 0, className: "w-52 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box", children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: true }, item.label))) })] }), brand] }), _jsx(Navbar.Center, { className: cnNav, children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: false }, item.label))) }), endContent && _jsx(Navbar.End, { children: endContent })] }));
};
//# sourceMappingURL=antnav2.js.map