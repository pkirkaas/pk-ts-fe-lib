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

import { StyleBuilder, cxsb, } from './styleUtils.js';

export let sbStyles: GenObj = {};

/**
 * So much better way to do this, but for now...
 */
export function buildFlexStyles(sObj: GenObj = sbStyles) { // Build combinations of flex display styles
  //NO CIGAR!
  let flexStyles: GenObj = {};
  let flexDisplays = StyleBuilder.flexDisplays;
  //let fsNameArr = [];
  for (let fdKey in flexDisplays) {
    let fsNameArr = [];
    let tmpStyle: GenObj = {};
    let fdVal = flexDisplays[fdKey];
    for (let fvKey in fdVal) {
      //      let fsNameArr = [];
      //      let tmpStyle:GenObj = {};
      let fvVal = fdVal[fvKey];
      fsNameArr.push(`${fdKey}${fvKey}`);
      _.merge(tmpStyle, fvVal);

      //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, fvVal});
      //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, });
      //      console.log(`bfs:`,`${fdKey}-${fvKey}`);
    }
    let tmpKey = fsNameArr.join('-');
    console.log(tmpKey, tmpStyle);
  }



}



sbStyles.frss = StyleBuilder.builder.d('ais', 'jcs').clone;
sbStyles.fcss = sbStyles.frss.d('c').clone;


