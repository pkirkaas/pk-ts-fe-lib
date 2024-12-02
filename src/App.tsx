import { useState } from 'react'
import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js'
import { StyleBuilder, } from './libs/styleUtils.js';
import {Tst1} from './Tst1.js';
import {Tst2} from './Tst2.js';
import { BrowserRouter, Route, Link, NavLink, Routes } from 'react-router-dom';
import {NavVals, BuildRoutes, RespNav, isActive,} from './react-utils/index.js';
//import styled  from 'styled-components';
import '../scss/pk-default.scss';
import {
  typeOf, GenObj,
} from 'pk-ts-common-lib';

export const rNavVals:NavVals = {
	about: { path: '/', label: "Tst1", component: Tst1,  },
	gallery: { path: '/tst2', label: "Tst2", component: Tst2 },
};
  
function App() {

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
