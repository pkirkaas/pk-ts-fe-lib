import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Build nav components & routes
 *
 * TODO: Re-implement for react-bootstrap NavBar, etc
 */
import { Route, NavLink, Routes } from 'react-router-dom';
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
export function BuildRoutes(navVals) {
    //export function BuildRoutes({navVals:NavVals}) {
    return (_jsx(Routes, { children: Object.entries(navVals).map(([key, val]) => (_jsx(Route, { path: val.path, Component: val.component }, key))) }));
}
/**
 * Makes a responsive menu
 */
export function RespNav(props) {
    let wrapClass = (spec) => {
        //return `m-1 p-1 border-gray-800 inline-block nav-link-wrap ${spec.customClass || ''}`;
        return `m-1 p-1 border-black border-solid border-1 inline-block nav-link-wrap ${spec.customClass || ''}`;
    };
    return (_jsx("div", { className: "block w-full bg-blue-100 px-2", children: Object.entries(props).map(([key, val]) => (_jsx("div", { className: wrapClass(val), children: _jsx(NavLink, { to: val.path, children: val.label }) }, key))) }));
}
//# sourceMappingURL=nav-utils.js.map