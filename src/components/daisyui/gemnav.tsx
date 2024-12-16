/** Blended Gemini/OAI/Etc proposed NavBar for DaisyUI */
"use client";

import React from 'react';
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
 * Renders a single menu item
 * @param item - Navigation item to render
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenuItem = (
  item: NavItem,
  isDropdown: boolean
): React.ReactNode => {
  const content = (
    <>
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </>
  );

  if (item.children) {
    if (isDropdown) {
      return (
        <li key={item.label}>
          <button
            className="btn btn-ghost btn-sm w-full justify-between"
            onClick={(e) => {
              e.preventDefault();
              // Toggle the dropdown
              const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
              if (dropdown) {
                dropdown.classList.toggle('hidden');
              }
            }}
          >
            {content}
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </button>
          <ul className="p-2 hidden">
            {item.children.map((child) => renderMenuItem(child, isDropdown))}
          </ul>
        </li>
      );
    }
    return (
      <Menu.Item key={item.label}>
        <details>
          <summary>{content}</summary>
          <ul className="p-2">
            {item.children.map((child) => renderMenuItem(child, isDropdown))}
          </ul>
        </details>
      </Menu.Item>
    );
  }

  if (typeof item.action === 'string') {
    // If action is a string, treat it as an href
    if (isDropdown) {
      return (
        <Dropdown.Item key={item.label}>
          <a href={item.action}>{content}</a>
        </Dropdown.Item>
      );
    }
    return (
      <Menu.Item key={item.label}>
        <a href={item.action}>{content}</a>
      </Menu.Item>
    );
  } else if (typeof item.action === 'function') {
    // If action is a function, use it as an onClick handler
    if (isDropdown) {
      return (
        <Dropdown.Item key={item.label}>
          <button onClick={item.action}>{content}</button>
        </Dropdown.Item>
      );
    }
    return (
      <Menu.Item key={item.label}>
        <button onClick={item.action}>{content}</button>
      </Menu.Item>
    );
  }

  // If no action is provided, render as a disabled item
  if (isDropdown) {
    return (
      <Dropdown.Item key={item.label} disabled>
        {content}
      </Dropdown.Item>
    );
  }
  return (
    <Menu.Item key={item.label} disabled>
      {content}
    </Menu.Item>
  );
};

/**
 * Renders the menu structure for both dropdown and full menu
 * @param items - Array of navigation items
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenu = (
  items: NavItem[],
  isDropdown: boolean
): React.ReactNode => {
  return items.map((item) => renderMenuItem(item, isDropdown));
};

/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export const PkNavbar: React.FC<PkNavbarProps> = ({
  brand,
  items,
  endContent,
  className = '',
  breakpoint = 'lg',
  renderMenuItem: customRenderMenuItem,
}) => {
  const renderItem = customRenderMenuItem || renderMenuItem;

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 menu-sm mt-3 z-[1]">
            {renderMenu(items, true)}
          </Dropdown.Menu>
        </Dropdown>
        {brand}
      </Navbar.Start>
      <Navbar.Center className={`hidden ${breakpoint}:flex`}>
        <Menu horizontal className="px-1">
          {renderMenu(items, false)}
        </Menu>
      </Navbar.Center>
      {endContent && <Navbar.End>{endContent}</Navbar.End>}
    </Navbar>
  );
};






















