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
    action: '/',
   // icon: <HomeIcon />, // Example icon component
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Hardware',
        action: '/products/hardware',
      },
      {
        label: 'Software',
        action: '/products/software',
      },
    ],
  },
  {
    label: 'About',
    action: '/about',
  },
];

export function TailwindPlay() {
  return (
    <div style={{background:"#faf", width:"100%", margin:5, padding:5, border:"solid red 1px", height:"100vh"}}>
      <PkNavbar style={{border:"solid red 2px"}} items={navigationItems} />
      <h1 className="tsth1">Tailwind Playground</h1>
      </div>
  );
}