/**
 * Uses my StyleBuilder to create some preconfigured, composable style instances 
 * Built on @emotion/css utils
 * 
 * Not react-specific, so no components & no .tsx
 * 
 * 24-Jun-11 18:15
 * 
 */

import {
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo,
  GenObj, isNumeric, isSimpleObject,

} from 'pk-ts-common-lib';


import _ from 'lodash';
import {
  cx,
  css as cssCss,
  injectGlobal,
} from '@emotion/css';

import { serializeStyles, } from '@emotion/serialize';

import {StyleBuilder, cxsb, } from './styleUtils.js';

export let sbStyles:GenObj = {};

/**
 * So much better way to do this, but for now...
 */
export function buildFlexStyles(sObj:GenObj = sbStyles) { // Build combinations of flex display styles
  let displays = StyleBuilder.displays;
  let flexDisps:GenObj = {}; 
  for (let key in displays) {
    let val = displays[key];
    if (isSimpleObject(val) && (val.display === 'flex')) {
      flexDisps[key] = val;
    }
  } // We have an obj w. all flex displays
  let fKeys = Object.keys(flexDisps);
  

  let alignItems = { s:'ais', c:'aic', g:'aig'};
  let justCont =  { s:'jcs', c:'jcc', g:'jcg'};
  let dir = {r:'r', c:'c'};
  let wraps = {w:'w', nw:'nw',}



}



sbStyles.frss = StyleBuilder.builder.d('ais','jcs').clone; 
sbStyles.fcss = sbStyles.frss.d('c').clone;


