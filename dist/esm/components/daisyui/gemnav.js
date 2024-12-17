/** Blended Gemini/OAI/Etc proposed NavBar for DaisyUI */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Navbar, Button, Dropdown, Menu } from 'react-daisyui';
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
        }, 100); // Small delay to prevent menu from closing during movement to submenu
    };
    // Clean up timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    const content = (_jsxs("span", { className: "flex items-center gap-2", children: [item.icon && _jsx("span", { className: "menu-item-icon", children: item.icon }), _jsx("span", { className: "menu-item-label", children: item.label })] }));
    const renderActionElement = () => {
        const baseClassName = `menu-item ${item.className || ''} ${item.disabled ? 'disabled' : ''}`;
        if (!item.action) {
            return (_jsx("span", { className: `${baseClassName} cursor-default`, children: content }));
        }
        if (typeof item.action === 'string') {
            return (_jsx("a", { href: item.action, className: baseClassName, "aria-disabled": item.disabled, children: content }));
        }
        return (_jsx("button", { onClick: item.action, className: baseClassName, disabled: item.disabled, children: content }));
    };
    // Handle items with children (submenus)
    if (item.children) {
        if (isDropdown) {
            return (_jsx("li", { className: "menu-item-with-submenu", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsxs("div", { className: "relative", children: [_jsxs("button", { className: `btn btn-ghost w-full justify-between ${item.className || ''}`, onClick: () => setIsOpen(!isOpen), children: [content, _jsx("svg", { className: `fill-current transition-transform ${isOpen ? 'rotate-180' : ''}`, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", children: _jsx("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }) })] }), isOpen && (_jsx("ul", { className: "absolute left-full top-0 w-48 p-2 bg-base-100 rounded-box shadow-lg", children: item.children.map((child) => (_jsx(MenuItem, { item: child, isDropdown: true }, child.label))) }))] }) }));
        }
        return (_jsx(Menu.Item, { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsxs("div", { className: "relative", children: [_jsx("button", { className: `btn btn-ghost ${item.className || ''}`, onClick: () => setIsOpen(!isOpen), children: content }), isOpen && (_jsx("ul", { className: "absolute left-0 top-full mt-2 w-48 p-2 bg-base-100 rounded-box shadow-lg", children: item.children.map((child) => (_jsx(MenuItem, { item: child, isDropdown: false }, child.label))) }))] }) }));
    }
    // Handle items without children
    if (isDropdown) {
        return _jsx(Dropdown.Item, { children: renderActionElement() });
    }
    return _jsx(Menu.Item, { children: renderActionElement() });
};
/**
 * A responsive navbar component using DaisyUI
 * Handles both mobile (dropdown) and desktop (horizontal menu) layouts
 */
export const PkNavbar = ({ brand, items, endContent, className = '', breakpoint = 'lg', theme, dropdownMenuClass = 'w-52 menu-sm mt-3 z-[1]', horizontalMenuClass = 'px-1', }) => {
    return (_jsxs(Navbar, { className: className, "data-theme": theme, children: [_jsxs(Navbar.Start, { children: [_jsxs(Dropdown, { children: [_jsx(Button, { tag: "label", color: "ghost", tabIndex: 0, className: `${breakpoint}:hidden`, "aria-label": "Menu", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h8m-8 6h16" }) }) }), _jsx(Dropdown.Menu, { tabIndex: 0, className: dropdownMenuClass, children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: true }, item.label))) })] }), brand] }), _jsx(Navbar.Center, { className: `hidden ${breakpoint}:flex`, children: _jsx(Menu, { horizontal: true, className: horizontalMenuClass, children: items.map((item) => (_jsx(MenuItem, { item: item, isDropdown: false }, item.label))) }) }), endContent && _jsx(Navbar.End, { children: endContent })] }));
};
//# sourceMappingURL=gemnav.js.map