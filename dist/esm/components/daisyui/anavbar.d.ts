/** Anthropic DaisyReact Navbar */
import React from 'react';
/**
 * Represents a single navigation item
 */
export type NavItem = {
    /** Display text for the item - also serves as unique identifier */
    label: string;
    /** Navigation URL - optional if item has children */
    href?: string;
    /** Optional icon component */
    icon?: React.ReactNode;
    /** Optional children for dropdown/submenu */
    children?: NavItem[];
};
/**
 * Props for the PkNavbar component
 */
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
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
};
/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export declare const PkNavbar: React.FC<PkNavbarProps>;
//# sourceMappingURL=anavbar.d.ts.map