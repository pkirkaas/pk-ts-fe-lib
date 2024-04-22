/**
 * Build nav components & routes
 * 
 * TODO: Re-implement for react-bootstrap NavBar, etc
 */

import { BrowserRouter, Route, Link, NavLink, Routes } from 'react-router-dom';
import {GenObj} from 'pk-ts-common-lib';



/**
 * NavVals: type to build NavBars, links & page navigation
 * BuildRoutes: Creates the routes from NavVals
 * 
 * 
 * 
 */
export type NavVals = {
	[key:string]: // The Route key 
    {path?: string, // The path
    label?: string, // the label for the menu item
    component?:any, // The componen to render
    customClass?:any}  // A custom CSS class for the 
    | any
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

export function BuildRoutes(navVals:NavVals) {
//export function BuildRoutes({navVals:NavVals}) {
  return (
    <Routes>
    {
      Object.entries(navVals).map(([key, val]) => (
        <Route key={key} path={val.path} Component={val.component} />
      ))
    }
    </Routes>
);
}


/**
 * Makes a responsive menu
 */
export function RespNav(props:NavVals) {
	let wrapClass = (spec) => {
		//return `m-1 p-1 border-gray-800 inline-block nav-link-wrap ${spec.customClass || ''}`;
		return `m-1 p-1 border-black border-solid border-1 inline-block nav-link-wrap ${spec.customClass || ''}`;
	};
	return (
		<div className="block w-full bg-blue-100 px-2">
			{
				Object.entries(props).map(([key, val]) => (
					<div key={key} className={wrapClass(val)}>
						<NavLink to={val.path}>{val.label}</NavLink>
					</div>
				))
			}
		</div>
		
	);
}
