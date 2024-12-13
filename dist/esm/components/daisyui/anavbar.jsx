/** Anthropic DaisyReact Navbar */
"use client";
import React from 'react';
import { Navbar, Button, Dropdown, Menu } from 'react-daisyui';
/**
 * Renders a recursive menu structure for both dropdown and full menu
 * @param items - Array of navigation items
 * @param isDropdown - Whether rendering in dropdown mode
 */
const renderMenuItems = (items, isDropdown) => {
    return items.map((item) => {
        if (item.children) {
            if (isDropdown) {
                return (<li key={item.label}>
            <a>
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </a>
            <ul className="p-2">
              {item.children.map((child) => (<li key={child.label}>
                  <a href={child.href}>
                    {child.icon && <span className="mr-2">{child.icon}</span>}
                    {child.label}
                  </a>
                </li>))}
            </ul>
          </li>);
            }
            return (<Menu.Item key={item.label}>
          <details>
            <summary>
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </summary>
            <ul className="p-2">
              {item.children.map((child) => (<Menu.Item key={child.label}>
                  <a href={child.href}>
                    {child.icon && <span className="mr-2">{child.icon}</span>}
                    {child.label}
                  </a>
                </Menu.Item>))}
            </ul>
          </details>
        </Menu.Item>);
        }
        if (isDropdown) {
            return (<Dropdown.Item key={item.label}>
          <a href={item.href}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </a>
        </Dropdown.Item>);
        }
        return (<Menu.Item key={item.label}>
        <a href={item.href}>
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </a>
      </Menu.Item>);
    });
};
/**
 * PkNavbar - A responsive navbar component using DaisyUI
 */
export const PkNavbar = ({ brand, items, endContent, className = '', breakpoint = 'lg' }) => {
    return (<Navbar className={className}>
      <Navbar.Start>
        <Dropdown>
          <Button tag="label" color="ghost" tabIndex={0} className={`${breakpoint}:hidden`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 menu-sm mt-3 z-[1]">
            {renderMenuItems(items, true)}
          </Dropdown.Menu>
        </Dropdown>
        {brand}
      </Navbar.Start>

      <Navbar.Center className={`hidden ${breakpoint}:flex`}>
        <Menu horizontal className="px-1">
          {renderMenuItems(items, false)}
        </Menu>
      </Navbar.Center>

      {endContent && <Navbar.End>{endContent}</Navbar.End>}
    </Navbar>);
};
//# sourceMappingURL=anavbar.jsx.map