"use client";
//import {StyleBuilder} from '../libs/styleUtils.js';
import { StyleBuilder } from '../react-utils/index.js';
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
/**
 * ABSURD - now react-bootstrap nav links no longer indicate the active state?
 * PLUS - the state isn't updated when clicking on link - have to refresh...
 * @param path - relative path for react route
 * @param activeClass  - default "active"
 * @return string|false - the active class, or null/false
 */
export function isActive(path, activeClass = "active") {
    let pathname = window.location.pathname;
    console.log(`in isActive - pathname:[${pathname}], path:[${path}]`);
    if (pathname === path) {
        return activeClass;
    }
    return false;
}
let aCname = StyleBuilder.builder.fw('bold').c('red').className;
export function BuildRoutes(navVals) {
    //export function BuildRoutes({navVals:NavVals}) {
    return (<Routes>
    {Object.entries(navVals).map(([key, val]) => (<Route key={key} path={val.path} Component={val.component}/>))}
    </Routes>);
}
/**
 * Makes a responsive menu
 */
export function RespNav(props) {
    let mbarStyle = StyleBuilder.builder.d('i').br().w('100%').c('red').bg('yellow');
    let mitemStyle = StyleBuilder.builder.d('i').br().w('auto').c('blue').bg('#aaf').ph(8).mh(8);
    let wrapClass = (spec) => {
        //return `m-1 p-1 border-gray-800 inline-block nav-link-wrap ${spec.customClass || ''}`;
        return `m-1 p-1 border-black border-solid border-1 inline-block nav-link-wrap ${spec.customClass || ''}`;
    };
    return (<div className="block w-full bg-blue-100 px-2" style={mbarStyle.style}>
			{Object.entries(props).map(([key, val]) => (<div key={key} className={wrapClass(val)} style={mitemStyle.style}>
						<NavLink className={isActive(val.path, aCname)} to={val.path}>{val.label}</NavLink>
					</div>))}
		</div>);
}
//# sourceMappingURL=nav-utils.jsx.map