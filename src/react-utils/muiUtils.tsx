/* @jsxImportSource @emotion/react */

/**
 * Utils for emotion & mui & react - NOT NECESSARILLY mui/material
 */

import {
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo, PkError,
  GenObj, isNumeric, isSimpleObject, camelKeys, isPrimitive, isObject,

} from 'pk-ts-common-lib';

import { StyleBuilder, cxsb, } from '../libs/styleUtils.js';

import _ from 'lodash';
import {
  cx,
  css as cssCss,
  injectGlobal,
} from '@emotion/css';

import {css,} from '@emotion/react';


/**
 * Experiment w. HOC component builder - but don't think can build one atop another - 
 * css is overwritten? 
 */
export const withStyled = (styles, Base='div') => (props) => {
  let sb = new StyleBuilder(styles);
  let sbStyle = sb.style;
  return (<Base css={css(sbStyle)} {...props} />);
}