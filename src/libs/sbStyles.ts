/**
 * Uses my StyleBuilder to create some preconfigured, composable style instances 
 * Built on @emotion/css utils
 * TODO: Is this useful? 
 * Not react-specific, so no components & no .tsx
 * 
 * 24-Jun-11 18:15
 * 
 */

import {
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo, PkError,
  GenObj, isNumeric, isSimpleObject, dotPathVal, toCamel, camelKeys, cartesianProduct,

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



