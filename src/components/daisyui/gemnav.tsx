/** Blended Gemini/OAI/Etc proposed NavBar for DaisyUI */
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
  /** Optional custom class for dropdown menu */
  dropdownMenuClass?: string;
  /** Optional custom class for horizontal menu */
  horizontalMenuClass?: string;
    /** Custom render function for menu items */
};


interface MenuItemProps {
  item: NavItem;
  isDropdown: boolean;
}


/**
 * Renders a single menu item, handling both dropdown and regular menu cases
 */
export const MenuItem: React.FC<MenuItemProps> = ({ item, isDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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

  const content = (
    <span className="flex items-center gap-2">
      {item.icon && <span className="menu-item-icon">{item.icon}</span>}
      <span className="menu-item-label">{item.label}</span>
    </span>
  );

  const renderActionElement = () => {
    const baseClassName = `menu-item ${item.className || ''} ${
      item.disabled ? 'disabled' : ''
    }`;

    if (!item.action) {
      return (
        <span className={`${baseClassName} cursor-default`}>
          {content}
        </span>
      );
    }

    if (typeof item.action === 'string') {
      return (
        <a
          href={item.action}
          className={baseClassName}
          aria-disabled={item.disabled}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        onClick={item.action}
        className={baseClassName}
        disabled={item.disabled}
      >
        {content}
      </button>
    );
  };

  // Handle items with children (submenus)
  if (item.children) {
    if (isDropdown) {
      return (
        <li 
          className="menu-item-with-submenu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <button 
              className={`btn btn-ghost w-full justify-between ${item.className || ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {content}
              <svg
                className={`fill-current transition-transform ${isOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute left-full top-0 w-48 p-2 bg-base-100 rounded-box shadow-lg">
                {item.children.map((child) => (
                  <MenuItem
                    key={child.label}
                    item={child}
                    isDropdown={true}
                  />
                ))}
              </ul>
            )}
          </div>
        </li>
      );
    }

    return (
      <Menu.Item
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <button 
            className={`btn btn-ghost ${item.className || ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {content}
          </button>
          {isOpen && (
            <ul className="absolute left-0 top-full mt-2 w-48 p-2 bg-base-100 rounded-box shadow-lg">
              {item.children.map((child) => (
                <MenuItem
                  key={child.label}
                  item={child}
                  isDropdown={false}
                />
              ))}
            </ul>
          )}
        </div>
      </Menu.Item>
    );
  }

  // Handle items without children
  if (isDropdown) {
    return <Dropdown.Item>{renderActionElement()}</Dropdown.Item>;
  }

  return <Menu.Item>{renderActionElement()}</Menu.Item>;
};

/**
 * A responsive navbar component using DaisyUI
 * Handles both mobile (dropdown) and desktop (horizontal menu) layouts
 */
export const PkNavbar: React.FC<PkNavbarProps> = ({
  brand,
  items,
  endContent,
  className = '',
  breakpoint = 'lg',
  theme,
  dropdownMenuClass = 'w-52 menu-sm mt-3 z-[1]',
  horizontalMenuClass = 'px-1',
}) => {
  return (
    <Navbar className={className} data-theme={theme}>
      <Navbar.Start>
        <Dropdown>
          <Button
            tag="label"
            color="ghost"
            tabIndex={0}
            className={`${breakpoint}:hidden`}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </Button>
          <Dropdown.Menu 
            tabIndex={0} 
            className={dropdownMenuClass}
          >
            {items.map((item) => (
              <MenuItem 
                key={item.label} 
                item={item} 
                isDropdown={true} 
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {brand}
      </Navbar.Start>

      <Navbar.Center className={`hidden ${breakpoint}:flex`}>
        <Menu 
          horizontal 
          className={horizontalMenuClass}
        >
          {items.map((item) => (
            <MenuItem 
              key={item.label} 
              item={item} 
              isDropdown={false} 
            />
          ))}
        </Menu>
      </Navbar.Center>

      {endContent && <Navbar.End>{endContent}</Navbar.End>}
    </Navbar>
  );
};