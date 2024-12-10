"use client";
/**
 * Tests for emotion styling
 */

// NPM Imports
import _ from 'lodash';
import { serializeStyles, } from '@emotion/serialize';
import createCache from '@emotion/cache'
import { CSSObject } from '@emotion/react'
import {
  cx,
  sheet,
  cache,
  css as cssCss,
  injectGlobal,
} from '@emotion/css';

import {css,} from '@emotion/react';

import {Box as MBox,} from '@mui/material';
import {Box as SBox,} from '@mui/system';

import {JSDOM} from 'jsdom';


// PKTSLIB Imports
import {
  isPrimitive, isObject,
  getProps, getObjDets, subObj, typeOf, allProps, allPropsP, objInfo, PkError,
  GenObj, isNumeric, isSimpleObject, dotPathVal, toCamel, camelKeys, cartesianProduct,

} from 'pk-ts-common-lib';

import {
  runCli, stdOut,
} from 'pk-ts-node-lib';

/*
export function tstJsdom(src?:string) {
  if (!src) {
    src = `<!DOCTYPE html><p>Hello world</p>`;
  }
  let dom = new JSDOM(src);
  let html = dom.serialize();
  let {window} = dom;
  let {document} = window;
  console.log({ html});
  return {dom, window, document, html};
}
  */


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
  /*
  for (let key of stKeys) {
    let st = tstStyles[key];
    let cnames = cxsb(st);
    let cnArr = cnames.split(' ');
    stdOut(`\n\nTesting extractors for style ${key} - ${cnames}`,{cnArr},`\n`);
    //for (let se in styleExtractors) {
     // let extractor = styleExtractors[se];
     // let css = extractor(cnames);
     // stdOut(`   extractor: [${se}]:`, {css},`\n`);
    //}
    //let css = styleFromClassname(cnames);
    //console.log({key, cnames, css});
  } 
      */
  let {inserted, registered, sheet} = cache;
  //console.log(`leaving tstStylesFromCNames`,{sheet, cache});
  console.log(`leaving tstStylesFromCNames`,{ cnames, inserted, registered, });
}

// All the below is useless!





/*
export const styleExtractors = {
getStylesFromClassNames,
extractCssFromClassNames,
//getComputedStylesFromEmotion, Hmm - not yet, have to change to use classnames
};
export function styleFromClassname(className:string) {
}

// Proposed by Anthropic:
// usage:
//emotionInspector.getStylesFromClassNames(containerClasses) // where containerClasses is a string or array of class names
class EmotionStyleInspector {
  private cache: ReturnType<typeof createCache>

  constructor() {
    this.cache = createCache({ key: 'inspector' })
  }


//   * Extracts the raw style object from an Emotion class name
//   * @param className - The Emotion-generated class name
//   * @returns The CSS style object or null if not found

  getStyleFromClassName(className: string): CSSObject | null {
    // Remove the emotion prefix if present
    const cleanClassName = className.replace(/^css-/, '')
    
    // Try to find the registered style in the cache
    const registered = this.cache.registered[`css-${cleanClassName}`]
    
    if (!registered) {
      return null
    }

    // Convert the serialized styles back to a CSS object
    try {
      const serialized = serializeStyles([registered], this.cache.registered, {})
      //return serialized.styles as CSSObject
      //return serialized.styles;
      return serialized;
    } catch (error) {
      console.error('Error parsing emotion style:', error)
      return null
    }
  }

 //  * Gets styles from multiple Emotion class names
 //  * @param classNames - Array of Emotion class names or space-separated string
 //  * @returns Object mapping class names to their style objects
  getStylesFromClassNames(classNames: string | string[]): Record<string, CSSObject | null> {
    const classes = Array.isArray(classNames) 
      ? classNames 
      : classNames.split(' ').filter(Boolean)

    return classes.reduce((acc, className) => {
      acc[className] = this.getStyleFromClassName(className)
      return acc
    }, {} as Record<string, CSSObject | null>)
  }
}

export const emotionInspector = new EmotionStyleInspector()
export function getStyleFromClassName(className) {
  return emotionInspector.getStyleFromClassName(className);
}
export function getStylesFromClassNames(classNames) {
  return emotionInspector.getStylesFromClassNames(classNames);
}


// From Grok:
// Usage:
//const classNames = ['css-123456', 'css-abcdef'];
//const cssString = extractCssFromClassNames(classNames);

// * Extracts CSS from Emotion class names.
// * @param {string[]} classNames - An array of class names generated by Emotion.
// * @returns {string} The CSS string corresponding to the class names.
export function extractCssFromClassNames(classNames) {
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }
    // Convert class names to style objects
    const styles = classNames.map(className => {
        // Assuming class names are prefixed with 'css-'
        const styleObject = cssCss`${className.replace('css-', '')}`;
        return serializeStyles([styleObject]);
    });

    // Combine all styles into one CSS string
    return styles.map(style => style.styles).join('\n');
}

// From OpenAI:
// Example usage:
// Example usage
//const styleObject = {
//  color: 'red',
//  backgroundColor: 'blue',
//  fontSize: '16px',
//  padding: '10px',
//};

//const computedStyles = getComputedStylesFromEmotion(styleObject);
//console.log('Computed Styles:', computedStyles);

// * Function to generate a CSS class name from a style object or string using Emotion
// * and retrieve the final computed CSS styles.
// *
// * @param {Object|string} styleObject - The Emotion style object or string.
// * @returns {Object} - The computed CSS styles as a plain object.
export function getComputedStylesFromEmotion(styleObject) {
  // Generate the class name using Emotion's `css` function
  const className = css(styleObject);

  // Create a virtual DOM using jsdom
  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="test"></div></body></html>');
  const document = dom.window.document;

  // Get the test element and apply the generated class name
  const testElement = document.getElementById('test');
  testElement.className = className;

  // Inject the generated CSS into the virtual DOM
  const styleTag = document.createElement('style');
  styleTag.textContent = dom.window.document.head.innerHTML;
  document.head.appendChild(styleTag);

  // Use `getComputedStyle` to retrieve the computed styles
  const computedStyles = dom.window.getComputedStyle(testElement);

  // Convert the computed styles to a plain object
  const stylesObject = {};
  for (const property of computedStyles) {
    stylesObject[property] = computedStyles.getPropertyValue(property);
  }

  return stylesObject;
}
*/
