/** Blended Gemini/OAI/Etc proposed NavBar for DaisyUI */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Navbar, Button, Dropdown } from 'react-daisyui';
const ChevronIcon = ({ isOpen }) => (_jsx("svg", { className: `w-4 h-4 ml-1 inline-block transition-transform ${isOpen ? 'rotate-180' : ''}`, fill: "none", strokeWidth: "2", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }) }));
/**
 * Renders a single menu item, handling both dropdown and regular menu cases
 */
export const MenuItem = ({ item, isDropdown }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(undefined);
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    // Content without wrapping element
    const content = (_jsxs(_Fragment, { children: [item.icon && _jsx("span", { className: "mr-2", children: item.icon }), _jsx("span", { children: item.label }), item.children && _jsx(ChevronIcon, { isOpen: isOpen })] }));
    // Handle items with children (submenus)
    if (item.children) {
        const submenuItems = item.children.map((child) => (_jsx(MenuItem, { item: child, isDropdown: isDropdown }, child.label)));
        if (isDropdown) {
            return (_jsxs("li", { className: "relative", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsx("button", { className: "w-full text-left p-2 hover:bg-base-200 flex items-center justify-between", onClick: () => setIsOpen(!isOpen), children: content }), isOpen && (_jsx("ul", { className: "menu menu-sm bg-base-100 rounded-box absolute left-full top-0 ml-1 w-48 shadow-lg", children: submenuItems }))] }));
        }
        return (_jsxs("div", { className: "relative", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsx("button", { className: "btn btn-ghost normal-case flex items-center", onClick: () => setIsOpen(!isOpen), children: content }), isOpen && (_jsx("ul", { className: "menu menu-sm bg-base-100 rounded-box absolute left-0 top-full mt-2 w-48 shadow-lg", children: submenuItems }))] }));
    }
    // Handle items without children
    const baseClassName = `${item.className || ''} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
    if (typeof item.action === 'string') {
        return (_jsx("li", { className: isDropdown ? '' : 'flex', children: _jsx("a", { href: item.action, className: `${isDropdown ? 'p-2 hover:bg-base-200 block w-full' : 'btn btn-ghost normal-case'} ${baseClassName}`, onClick: (e) => item.disabled && e.preventDefault(), children: content }) }));
    }
    return (_jsx("li", { className: isDropdown ? '' : 'flex', children: _jsx("button", { onClick: item.action, disabled: item.disabled, className: `${isDropdown ? 'p-2 hover:bg-base-200 block w-full text-left' : 'btn btn-ghost normal-case'} ${baseClassName}`, children: content }) }));
};
/**
 * A responsive navbar component using DaisyUI
 */
export const PkNavbar = ({ brand, items, endContent, className = '', breakpoint = 'lg', theme, }) => {
    return (_jsxs(Navbar, { className: className, "data-theme": theme, children: [_jsxs(Navbar.Start, { children: [_jsxs(Dropdown, { children: [_jsx(Button, { tag: "label", color: "ghost", tabIndex: 0, className: `${breakpoint}:hidden`, "aria-label": "Menu", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h8m-8 6h16" }) }) }), _jsx(Dropdown.Menu, { tabIndex: 0, className: "w-52 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box", children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: true }, item.label))) })] }), brand] }), _jsx(Navbar.Center, { className: `hidden ${breakpoint}:flex items-center gap-2`, children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: false }, item.label))) }), endContent && _jsx(Navbar.End, { children: endContent })] }));
};
//# sourceMappingURL=antnav.js.map