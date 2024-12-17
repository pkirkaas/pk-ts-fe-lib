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
};


interface MenuItemProps {
  item: NavItem;
  isDropdown: boolean;
}

const ChevronIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 ml-1 inline-block transition-transform ${
      isOpen ? 'rotate-180' : ''
    }`}
    fill="none"
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

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
  const content = (
    <>
      {item.icon && <span className="mr-2">{item.icon}</span>}
      <span>{item.label}</span>
      {item.children && <ChevronIcon isOpen={isOpen} />}
    </>
  );

  // Handle items with children (submenus)
  if (item.children) {
    const submenuItems = item.children.map((child) => (
      <MenuItem key={child.label} item={child} isDropdown={isDropdown} />
    ));

    if (isDropdown) {
      return (
        <li
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="w-full text-left p-2 hover:bg-base-200 flex items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            {content}
          </button>
          {isOpen && (
            <ul className="menu menu-sm bg-base-100 rounded-box absolute left-full top-0 ml-1 w-48 shadow-lg">
              {submenuItems}
            </ul>
          )}
        </li>
      );
    }

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="btn btn-ghost normal-case flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {content}
        </button>
        {isOpen && (
          <ul className="menu menu-sm bg-base-100 rounded-box absolute left-0 top-full mt-2 w-48 shadow-lg">
            {submenuItems}
          </ul>
        )}
      </div>
    );
  }

  // Handle items without children
  const baseClassName = `${item.className || ''} ${
    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  if (typeof item.action === 'string') {
    return (
      <li className={isDropdown ? '' : 'flex'}>
        <a
          href={item.action}
          className={`${
            isDropdown ? 'p-2 hover:bg-base-200 block w-full' : 'btn btn-ghost normal-case'
          } ${baseClassName}`}
          onClick={(e) => item.disabled && e.preventDefault()}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className={isDropdown ? '' : 'flex'}>
      <button
        onClick={item.action}
        disabled={item.disabled}
        className={`${
          isDropdown ? 'p-2 hover:bg-base-200 block w-full text-left' : 'btn btn-ghost normal-case'
        } ${baseClassName}`}
      >
        {content}
      </button>
    </li>
  );
};




/**
 * A responsive navbar component using DaisyUI
 */
export const PkNavbar: React.FC<PkNavbarProps> = ({
  brand,
  items,
  endContent,
  className = '',
  breakpoint = 'lg',
  theme,
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
            className="w-52 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
          >
            {items.map((item) => (
              <MenuItem key={item.label} item={item} isDropdown={true} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {brand}
      </Navbar.Start>

      <Navbar.Center className={`hidden ${breakpoint}:flex items-center gap-2`}>
        {items.map((item) => (
          <MenuItem key={item.label} item={item} isDropdown={false} />
        ))}
      </Navbar.Center>

      {endContent && <Navbar.End>{endContent}</Navbar.End>}
    </Navbar>
  );
};



















