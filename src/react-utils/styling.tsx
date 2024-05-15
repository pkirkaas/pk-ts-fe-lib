/**
 * CSS Styling support
 */

import { styled }  from 'styled-components';
import classNames from 'classnames';
import {isSimpleObject, typeOf, GenObj, intersect, isEmpty, toCamelCase, toSnakeCase
} from 'pk-ts-common-lib';

import * as _ from 'lodash';

/**
 * Takes a style object or array of style objects and returns a new, flattened style obj
 * Since react "style" requires camelCase & styled_commponents require true CSS prop keys,
 * will convert as specified in 'toCammel'
 * @param styles:GenObj | GenObj[] - style objects to flatten
 * @param toCamel?: boolean = default true - else, snake 
 */
export function flattenStyles(styles:GenObj|GenObj[], toCamel=true):GenObj {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }
  //@ts-ignore
  let flatStyles = Object.assign({}, ...styles);
  let cased = keysToCamel(flatStyles, toCamel);
  return cased;
}

/**
 * Takes a flat object & returns new object w. keys either cammelCased (default) or
 * snake cased if toCamel=false
 * @param obj:GenObj
 * @param toCamel:boolean = default true
 * @return new GenObj w. keys appropriately cased.
 */
export function keysToCamel(obj:GenObj, toCamel=true):GenObj {
  let ret:GenObj = {};
  for (let key in obj) {
    let val = obj[key];
    let newKey = "";
    if (toCamel) {
      newKey = toCamelCase(key);
    } else {
      newKey = toSnakeCase(key);
    }
    ret[newKey] = val;
  }
  return ret;
}

//export const cssClassNames = [
/** Some CSS Generated classes from pk-default.scss:
   Flex containers: 
      fr-s-s: flex row start start
      fc-g-c: flex column grow center
   Colors - font, background & border:
     c-04f - font color
     bg-ef0 - background color
     bc-f00 - border color

  Dimensions - margin, width, height, padding:
    mv3 - vertical margins
    ph4 - horizontal padding
    br2 - border radius
    maxw10 - max width
    h10 - height

  Font Sizes
    fs-xl - extra-large, etc: xxs,xs, s, m, l . xl, xxl. xxxl, smaller, larger

  Font weights:
    fw-1 -> fw-9

  Font Families: oswald lato roboto open-sans montserrat raleway droid-sans s-sans-pro

  General CSS Classes:
  inner-border, tac, tal, tar - text aligns,   
  
   */

  /**
   * HOC Function to custom style components, using both "classNames"
   * & "styled" & regular React style property  
   * @param comp - the React compnent to style/modify
   * @param opts - any - string, array of strings, or obj
   *   -- if string or array, assumes it is just for "classNames"
   *   -- if object WITHOUT a key of styled or classes, assumes
   *  it is just for "styled"
   *   if an object w. keys of styled or style or classes, extracts & 
   *  uses both "styled" && "classNames"
   */

  /*
  export function customComponent(component, opts?:any) {
    let classes:any;
    let styled:any;
    let style:any;
    let optKeys = ['styled', 'style', 'classes']; // 
    let normopt:GenObj = {}; // Normalize the given opts
    if (isSimpleObject(opts)) { //check if it
      if 
    }


    if (
  }
  */






















