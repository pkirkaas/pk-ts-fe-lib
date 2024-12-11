"use client";
/**
 * Tests for emotion styling
 */

// NPM Imports
import _ from 'lodash';
import { serializeStyles, } from '@emotion/serialize';
import {
  cx,
  sheet,
  cache,
  css as cssCss,
} from '@emotion/css';


// PKTSLIB Imports
import {
  isPrimitive, isObject,
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo, PkError,
  GenObj, isNumeric, isSimpleObject, dotPathVal, toCamel, camelKeys, cartesianProduct,
} from 'pk-ts-common-lib';

import {
  runCli, stdOut,
} from 'pk-ts-node-lib';

// Local Imports

import { StyleBuilder, cxsb, } from '../libs/styleUtils.js';


/**
 * Test CSS building, class name generation, and resulting CSS
 */
export function mkClassNames(...args) {
  if  (!args || !args.length) {
  }
  let sb1 = StyleBuilder.builder.d('b').fs('lg').c('blue').m(9).p(5).br({color:'red', radius:5, width:10, which:"v"});
  let stobj = {
      display:'block',
      color:'red',
    };
  let cnames = cxsb(sb1,stobj);
  return cnames;
}

export const tstStyles = {
  sb1: StyleBuilder.builder.d('b').fs('lg').c('blue').m(9).p(5).br({color:'red', radius:5, width:10, which:"v"}),
  stobj: {
      display:'block',
      color:'red',
    }
};

// Stub to implement - use cache inserted & registered
export function styleFromClassname(cname) {
}

export function tstStylesFromCNames() {
  let stKeys = Object.keys(tstStyles);
  let stStyles = Object.values(tstStyles);
  let cnames = cxsb('tiger-class', ...stStyles);
  let {inserted, registered, sheet} = cache;
  //console.log(`leaving tstStylesFromCNames`,{sheet, cache});
  console.log(`leaving tstStylesFromCNames`,{ cnames, inserted, registered, });
}