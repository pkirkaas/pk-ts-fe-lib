"use client";
import { cache, } from '@emotion/css';
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
export function tstCss(...args) {
}
export function mkClassNames(...args) {
    if (!args || !args.length) {
    }
    let sb1 = StyleBuilder.builder.d('b').fs('lg').c('blue').m(9).p(5).br({ color: 'red', radius: 5, width: 10, which: "v" });
    let stobj = {
        display: 'block',
        color: 'red',
    };
    let cnames = cxsb(sb1, stobj);
    return cnames;
}
export const tstStyles = {
    sb1: StyleBuilder.builder.d('b').fs('lg').c('blue').m(9).p(5).br({ color: 'red', radius: 5, width: 10, which: "v" }),
    stobj: {
        display: 'block',
        color: 'red',
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
    let { inserted, registered, sheet } = cache;
    //console.log(`leaving tstStylesFromCNames`,{sheet, cache});
    console.log(`leaving tstStylesFromCNames`, { cnames, inserted, registered, });
}
//# sourceMappingURL=emotionTests.js.map