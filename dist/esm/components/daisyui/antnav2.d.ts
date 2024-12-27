import React from 'react';
import { GenObj } from 'pk-ts-common-lib';
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
    disabled?: boolean;
};
export type PkNavbarProps = {
    style?: GenObj;
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
    /** Theme for the navbar */
    theme?: string;
};
interface MenuItemProps {
    item: NavItem;
    isDropdown?: boolean;
}
export declare const Chevron: React.FC<{
    className?: string;
}>;
export declare const MenuItem: React.FC<MenuItemProps>;
export declare const PkNavbar: React.FC<PkNavbarProps>;
export {};
//# sourceMappingURL=antnav2.d.ts.map