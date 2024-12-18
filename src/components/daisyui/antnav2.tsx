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

import React, {useState, useRef} from 'react';
import { Navbar, Button, Dropdown, Menu } from 'react-daisyui';

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

export const Chevron: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`ml-1 ${className}`}>▾</span>
);
export const MenuItem: React.FC<MenuItemProps> = ({ item, isDropdown = false }) => {
  const handleClick = (e: React.MouseEvent) => {
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

  const renderContent = () => (
    <>
      <span>{item.label}</span>
      {item.children && <Chevron />}
    </>
  );

  if (item.children) {
    return (
      <div className="dropdown dropdown-hover">
        <button className={baseClassName}>
          {renderContent()}
        </button>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {item.children.map((child) => (
            <MenuItem key={child.label} item={child} isDropdown={true} />
          ))}
        </ul>
      </div>
    );
  }

  if (typeof item.action === 'string') {
    return (
      <a
        href={item.action}
        className={baseClassName}
        onClick={handleClick}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      onClick={handleClick}
      disabled={item.disabled}
    >
      {renderContent()}
    </button>
  );
};



export const PkNavbar: React.FC<PkNavbarProps> = ({
  brand,
  items,
  endContent,
  className = '',
  breakpoint = 'lg'
}) => {
  return (
    <Navbar className={className}>
      <Navbar.Start>
        <Dropdown>
          <Button
            tag="label"
            color="ghost"
            tabIndex={0}
            className={`${breakpoint}:hidden`}
          >
            ☰
          </Button>
          <Dropdown.Menu
            tabIndex={0}
            className="w-52 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
          >
            {items.map((item) => (
              <MenuItem key={item.label} item={item} isDropdown={true} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {brand}
      </Navbar.Start>

      <Navbar.Center className={`hidden ${breakpoint}:flex gap-2`}>
        {items.map((item) => (
          <MenuItem key={item.label} item={item} isDropdown={false} />
        ))}
      </Navbar.Center>

      {endContent && <Navbar.End>{endContent}</Navbar.End>}
    </Navbar>
  );
};



