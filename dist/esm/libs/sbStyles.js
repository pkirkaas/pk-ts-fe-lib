/**
 * Uses my StyleBuilder to create some preconfigured, composable style instances
 * Built on @emotion/css utils
 * TODO: Is this useful?
 * Not react-specific, so no components & no .tsx
 *
 * 24-Jun-11 18:15
 *
 */
import { dotPathVal, toCamel, camelKeys, cartesianProduct, } from 'pk-ts-common-lib';
import _ from 'lodash';
import { StyleBuilder, } from './styleUtils.js';
export let sbStyles = {};
/**
 * So much better way to do this, but for now...
 * Builds flex styles for col, row, wrap, align-itmes, justify-content, w. 36 keys:
fdrWrwAisJcs fdrWrwAisJcc fdrWrwAisJcg fdrWrwAicJcs fdrWrwAicJcc fdrWrwAicJcg fdrWrwAigJcs
fdrWrwAigJcc fdrWrwAigJcg fdrWrnAisJcs fdrWrnAisJcc fdrWrnAisJcg fdrWrnAicJcs fdrWrnAicJcc
fdrWrnAicJcg fdrWrnAigJcs fdrWrnAigJcc fdrWrnAigJcg fdcWrwAisJcs fdcWrwAisJcc fdcWrwAisJcg
fdcWrwAicJcs fdcWrwAicJcc fdcWrwAicJcg fdcWrwAigJcs fdcWrwAigJcc fdcWrwAigJcg fdcWrnAisJcs
fdcWrnAisJcc fdcWrnAisJcg fdcWrnAicJcs fdcWrnAicJcc fdcWrnAicJcg fdcWrnAigJcs fdcWrnAigJcc fdcWrnAigJcg
 */
export function mkFlexStyles() {
    let flexStyles = {};
    let flexDisplays = StyleBuilder.flexDisplays;
    let fsNameArr = [];
    for (let fdKey in flexDisplays) {
        let tmpArr = [];
        let fdVal = flexDisplays[fdKey];
        for (let fvKey in fdVal) {
            //let fvVal = fdVal[fvKey];
            let keyStr = `${fdKey}.${fvKey}`;
            tmpArr.push(keyStr);
        }
        fsNameArr = cartesianProduct(fsNameArr, tmpArr);
    }
    let flatArr = fsNameArr.map((el) => el.flat(Infinity));
    for (let row of flatArr) {
        let tmpStyle = {};
        for (let el of row) {
            let dispS = dotPathVal(flexDisplays, el);
            tmpStyle = _.merge(tmpStyle, dispS);
        }
        let fsSKey = toCamel(row.join('-').replaceAll('\.', ''));
        //flexStyles[fsSKey] = StyleBuilder.build(tmpStyle).style;
        flexStyles[fsSKey] = StyleBuilder.build(tmpStyle);
    }
    flexStyles = camelKeys(flexStyles);
    //console.log(`bsf`, { flexStyles});
    return flexStyles;
}
export function mkFs() {
}
//# sourceMappingURL=sbStyles.js.map