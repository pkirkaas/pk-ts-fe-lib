/**
 * Experimental Tailwind Playground
 */

import {
   NavItem, 
  PkNavbar, 
  type PkNavbarProps
} from './components/daisyui/index.js';
//} from './components/daisyui/anavbar.js';
//} from '@/components/daisyui/index.js';

//const navigationItems: NavItem[] = [
const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
   // icon: <HomeIcon />, // Example icon component
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Hardware',
        href: '/products/hardware',
      },
      {
        label: 'Software',
        href: '/products/software',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
];

export function TailwindPlay() {
  return (
    <div style={{background:"#faf", width:"100%", margin:5, padding:5, border:"solid red 1px", height:"100vh"}}>
      <PkNavbar items={navigationItems} />
      <h1 className="tsth1">Tailwind Playground</h1>
      </div>
  );
}