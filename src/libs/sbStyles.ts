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
  GenObj, isNumeric, isSimpleObject, dotPathVal, toCamel, camelKeys,

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
export function buildFlexStylesOld(sObj: GenObj = sbStyles) { // Build combinations of flex display styles
  //NO CIGAR!
  let flexStyles: GenObj = {};
  let flexDisplays = StyleBuilder.flexDisplays;
  let fsNameArr = [];
  for (let fdKey in flexDisplays) {
    let tmpStyle: GenObj = {};
    let fdVal = flexDisplays[fdKey];
    for (let fvKey in fdVal) {
      //      let fsNameArr = [];
      //      let tmpStyle:GenObj = {};
      let fvVal = fdVal[fvKey];
      fsNameArr.push(`${fdKey}${fvKey}`);
      //_.merge(tmpStyle, fvVal);
      console.log(`Inner Loop:`, {
        fdKey, fvKey, fvVal, fsNameArr,
        //   tmpStyle,
      });

      //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, fvVal});
      //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, });
      //      console.log(`bfs:`,`${fdKey}-${fvKey}`);
    }
    let tmpKey = fsNameArr.join('-');
    console.log(tmpKey, tmpStyle);
  }
}

//function cartesianProduct(arrays) {
function cartesianProduct(...arrays) {
  // Initialize with an empty array within an array
  return arrays.reduce((acc, array) => {
    // If array is empty, just return the accumulated results so far
    if (array.length === 0) return acc;

    // Accumulate combinations of current result and new array
    return acc.flatMap(accElem => array.map(elem => [...accElem, elem]));
  }, [[]]);
}


export function buildFlexStyles(sObj: GenObj = sbStyles) { // Build combinations of flex display styles
  //NO CIGAR!
  let flexStyles: GenObj = {};
  let flexDisplays = StyleBuilder.flexDisplays;
  let fsNameArr = [];
  // let recurse = function(keyArr,
  for (let fdKey in flexDisplays) {
    let tmpArr = [];
    //let tmpStyle: GenObj = {};
    let fdVal = flexDisplays[fdKey];
    for (let fvKey in fdVal) {
      //  let tmpArr = [];
      //  let tmpArr2 = [];
      //      let fsNameArr = [];
      //      let tmpStyle:GenObj = {};
      let fvVal = fdVal[fvKey];
      let keyStr = `${fdKey}.${fvKey}`;
      tmpArr.push(keyStr);
    }
    fsNameArr = cartesianProduct(fsNameArr, tmpArr);
  }
  let flatArr = [];
  for (let fsNA of fsNameArr) {
    flatArr.push(fsNA.flat(Infinity));
  }
  let fstyleObj:GenObj = {};
  for (let row of flatArr) {
    //let fsSKey = toCamel(row.join('-').replaceAll('.'));
    let tmpStyle:GenObj = {};
    let fsSKey = toCamel(row.join('-').replaceAll('\.',''));
    let retArr = [];
    for (let el of row) {
      let dispS = dotPathVal(flexDisplays, el);
      tmpStyle = _.merge(tmpStyle, dispS);
      retArr.push(dispS);
    }
    //fstyleObj[fsSKey] = "TmpVal"; 
    //fstyleObj[fsSKey] = retArr;
    fstyleObj[fsSKey] = tmpStyle;
  }
  fstyleObj = camelKeys(fstyleObj);
  //console.log(`bsf`, {fsNameArr});
  console.log(`bsf`, { fstyleObj});


}


sbStyles.frss = StyleBuilder.builder.d('ais', 'jcs').clone;
sbStyles.fcss = sbStyles.frss.d('c').clone;


