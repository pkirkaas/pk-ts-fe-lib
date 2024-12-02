/**
 * CSS Styling support
 */

import { styled }  from 'styled-components';
import classNames from 'classnames';
import {isSimpleObject, typeOf, GenObj, intersect, isEmpty, toCamelCase, toSnakeCase, camelKeys,
} from 'pk-ts-common-lib';

import * as _ from 'lodash';

/**
 * Takes a style object or array of style objects and returns a new, flattened style obj
 * Since react "style" requires camelCase & styled_commponents require true CSS prop keys,
 * will convert as specified in 'toCammel'
 * @param styles:GenObj | GenObj[] - style objects to flatten
 * @param toCamel?: boolean = default true - else, snake 
 */
/*
export function flattenStyles(styles:GenObj|GenObj[], toCamel=true):GenObj {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }
  //@ts-ignore
  let flatStyles = Object.assign({}, ...styles);
  let cased = camelKeys(flatStyles);
  return cased;
}
  */


