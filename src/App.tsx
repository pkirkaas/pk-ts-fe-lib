/**
 * Tst App for pk fe testing
 */

// NPM packages
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Link, NavLink, Routes } from 'react-router-dom';
import {Responsive} from './components/index.js';


// PKLib Imports
import { typeOf, GenObj, } from 'pk-ts-common-lib';

// Local imports





import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js'
import { StyleBuilder, } from './libs/styleUtils.js';
import {Tst1} from './Tst1.js';
import {Tst2} from './Tst2.js';
import {Tst3} from './Tst3.js';
import {NavVals, BuildRoutes, RespNav, isActive,} from './react-utils/index.js';
import {MainNavbar} from './FeNavBar.js';
//import styled  from 'styled-components';
import '../scss/pk-default.scss';

export const rNavVals:NavVals = {
	about: { path: '/', label: "Tst1", component: Tst1,  },
	gallery: { path: '/tst2', label: "Tst2", component: Tst2 },
	panels: { path: '/tst3', label: "Panels", component: Tst3 },
};
  
function App(props:any) {

        //<div className='tsttw'>Testing Tailwind</div> (check if tailwind.css is loaded)
         // <h1 className="text-3xl font-bold underline text-center">
  return (
        <div id="app-id" {...props}>
      <Container fluid>
          <h1 className="tsth1">
    Hello world!
  </h1>
  <Responsive />
  <BrowserRouter>
  <>

  {RespNav(rNavVals)}
  <div className=" p-16 border border-blue-200 bg-red-100 ">

    {BuildRoutes(rNavVals)}
  </div>
  </>
  </BrowserRouter>
  </Container>
  </div>
  )
}

export default App
