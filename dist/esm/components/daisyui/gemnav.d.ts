/** Blended Gemini/OAI/Etc proposed NavBar for DaisyUI */
import React from 'react';
/**
 * @typedef NavItem
 * @description Represents a single navigation item.
 * @property {string} label - Display text for the item - also serves as unique identifier.
 * @property {string | (() => void)} [action] - Navigation URL or a JavaScript function to execute.
 * @property {React.ReactNode} [icon] - Optional icon component.
 * @property {NavItem[]} [children] - Optional children for dropdown/submenu.
 * @property {string} [className] - Optional className for additional styling.
 */
export type NavItem = {
    label: string;
    action?: string | (() => void);
    icon?: React.ReactNode;
    children?: NavItem[];
    className?: string;
};
export type PkNavbarProps = {
    /** Brand/logo element displayed on the left */
    brand?: React.ReactNode;
    /** Navigation structure */
    items: NavItem[];
    /** Optional right-side content */
    endContent?: React.ReactNode;
    /** Optional className for additional styling */
    className?: string;
    /** Breakpoint for mobile/desktop switch - defaults to 'lg' */
    breakpoint?: "sm" | "md" | "lg" | "xl";
    /** Custom render function for menu items */
    renderMenuItem?: (item: NavItem, isDropdown: boolean) => React.ReactNode;
};
/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export declare const PkNavbar: React.FC<PkNavbarProps>;
//# sourceMappingURL=gemnav.d.ts.map