/**
 * Uses my StyleBuilder to create some preconfigured, composable style instances
 * Built on @emotion/css utils
 *
 * Not react-specific, so no components & no .tsx
 *
 * 24-Jun-11 18:15
 *
 */
import { isSimpleObject, } from 'pk-ts-common-lib';
import { StyleBuilder, } from './styleUtils.js';
export let sbStyles = {};
/**
 * So much better way to do this, but for now...
 */
export function buildFlexStyles(sObj = sbStyles) {
    let displays = StyleBuilder.displays;
    let flexDisps = {};
    for (let key in displays) {
        let val = displays[key];
        if (isSimpleObject(val) && (val.display === 'flex')) {
            flexDisps[key] = val;
        }
    } // We have an obj w. all flex displays
    let fKeys = Object.keys(flexDisps);
    let alignItems = { s: 'ais', c: 'aic', g: 'aig' };
    let justCont = { s: 'jcs', c: 'jcc', g: 'jcg' };
    let dir = { r: 'r', c: 'c' };
    let wraps = { w: 'w', nw: 'nw', };
}
sbStyles.frss = StyleBuilder.builder.d('ais', 'jcs').clone;
sbStyles.fcss = sbStyles.frss.d('c').clone;
//# sourceMappingURL=sbStyles.js.map