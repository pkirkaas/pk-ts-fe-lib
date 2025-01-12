/* @jsxImportSource @emotion/react */
"use client";

/**
 * Utils for emotion & mui & react - NOT NECESSARILLY mui/material
 */

import {
  getProps, getObjDets, subObj, typeOf, allProps,  objInfo, PkError,
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

import {Box as MBox,} from '@mui/material';
import {Box as SBox,} from '@mui/system';


/**
 * HOC component builder - build styled components on top of other styled components
 * DEPENDS ON @emotion/react & the @emotion/react pragmas!
 * 
 * @param styles - object or object[], of regular style objects or StyleBuilder instances
 * @param Base? - an html element/string or a react component
 * @return a styled react component based on the Base component
 * 
 * ACTUALLY WORKS!
let bs1 = StyleBuilder.builder.br('red', 5).ta('c').c('blue').fw('bold').fs('lg');
let bsMod = StyleBuilder.builder.m(10).p(10).fs('xxl').c('green');;
let Bs1 = withStyled(bs1);
let BsMod = withStyled(bsMod, Bs1);
 */
export const withStyled = (styles, Base:any='div') => (props) => {
  let sb = new StyleBuilder(styles);
  let sbStyle = sb.style;
  return (<Base css={css(sbStyle)} {...props} />);
}

export const withSBox = (styles, Base:any=SBox) => (props) => {
  let sb = new StyleBuilder(styles);
  let sbStyle = sb.style;
  return (<Base css={css(sbStyle)} {...props} />);
}

export const withMBox = (styles, Base:any=MBox) => (props) => {
  let sb = new StyleBuilder(styles);
  let sbStyle = sb.style;
  return (<Base css={css(sbStyle)} {...props} />);
}
