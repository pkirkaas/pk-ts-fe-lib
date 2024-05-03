import { Component } from 'react';
/**
 * NavVals: type to build NavBars, links & page navigation
 * BuildRoutes: Creates the routes from NavVals
 *
 *
 *
 */
export type NavVals = {
    [key: string]: // The Route key 
    {
        path?: string;
        label?: string | Component;
        component?: any;
        customClass?: any;
    } | any;
};
/**
 * Example NavValues obj:
export const rNavVals:NavVals = {
    about: { path: '/', label: "Paul Kirkaas", component: About, customClass: "home-link font-bold" },
    gallery: { path: '/gallery', label: "Gallery", component: Gallery },
    manifesto: { path: '/manifesto', label: "Manifesto", component: Manifesto },
};
 */
/** Example in App.tsx: */
/**
 export const rNavVals:NavVals = {
    about: { path: '/', label: "Paul Kirkaas", component: About, customClass: "home-link font-bold" },
    gallery: { path: '/gallery', label: "Gallery", component: Gallery },
    manifesto: { path: '/manifesto', label: "Manifesto", component: Manifesto },
};
function App() {
  const [count, setCount] = useState(0);
  useEffect( () => {
    let tstfetch = async () => {
      let resp  = await fetch('./api');
      console.log("Resp:", { resp });
      let json = await resp.json();
      console.log("Fetched data:", { json });
    };
    tstfetch();
  });

  return (
  <BrowserRouter>
  <>

  {RespNav(rNavVals)}
  <div className=" p-16 border border-blue-200 bg-red-100 ">

    {BuildRoutes(rNavVals)}
  </div>
  </>
  </BrowserRouter>
  )
}

export default App
 *
 */
/**
 * ABSURD - now react-bootstrap nav links no longer indicate the active state?
 * @param path - relative path for react route
 * @param activeClass  - default "active"
 * @return string|false - the active class, or null/false
 */
export declare function isActive(path: string, activeClass?: string): any;
export declare function BuildRoutes(navVals: NavVals): import("react/jsx-runtime").JSX.Element;
/**
 * Makes a responsive menu
 */
export declare function RespNav(props: NavVals): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=nav-utils.d.ts.map