/**
 * Uses my StyleBuilder to create some preconfigured, composable style instances
 * Built on @emotion/css utils
 *
 * Not react-specific, so no components & no .tsx
 *
 * 24-Jun-11 18:15
 *
 */
import { StyleBuilder, } from './styleUtils.js';
export let sbStyles = {};
/**
 * So much better way to do this, but for now...
 */
export function buildFlexStylesOld(sObj = sbStyles) {
    //NO CIGAR!
    let flexStyles = {};
    let flexDisplays = StyleBuilder.flexDisplays;
    let fsNameArr = [];
    for (let fdKey in flexDisplays) {
        let tmpStyle = {};
        let fdVal = flexDisplays[fdKey];
        for (let fvKey in fdVal) {
            //      let fsNameArr = [];
            //      let tmpStyle:GenObj = {};
            let fvVal = fdVal[fvKey];
            fsNameArr.push(`${fdKey}${fvKey}`);
            //_.merge(tmpStyle, fvVal);
            console.log(`Inner Loop:`, { fdKey, fvKey, fvVal, fsNameArr,
                //   tmpStyle,
            });
            //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, fvVal});
            //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, });
            //      console.log(`bfs:`,`${fdKey}-${fvKey}`);
        }
        let tmpKey = fsNameArr.join('-');
        console.log(tmpKey, tmpStyle);
    }
}
export function buildFlexStyles(sObj = sbStyles) {
    //NO CIGAR!
    let flexStyles = {};
    let flexDisplays = StyleBuilder.flexDisplays;
    let fsNameArr = [];
    // let recurse = function(keyArr,
    for (let fdKey in flexDisplays) {
        let tmpStyle = {};
        let fdVal = flexDisplays[fdKey];
        for (let fvKey in fdVal) {
            //      let fsNameArr = [];
            //      let tmpStyle:GenObj = {};
            let fvVal = fdVal[fvKey];
            let keyStr = `${fdKey}${fvKey}`;
            fsNameArr.push(`${fdKey}${fvKey}`);
            //_.merge(tmpStyle, fvVal);
            console.log(`Inner Loop:`, { fdKey, fvKey, fvVal, fsNameArr,
                //   tmpStyle,
            });
            //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, fvVal});
            //console.log(`buildFlexStyles:`,{fdKey, fdVal, fvKey, });
            //      console.log(`bfs:`,`${fdKey}-${fvKey}`);
        }
        let tmpKey = fsNameArr.join('-');
        console.log(tmpKey, tmpStyle);
    }
}
sbStyles.frss = StyleBuilder.builder.d('ais', 'jcs').clone;
sbStyles.fcss = sbStyles.frss.d('c').clone;
//# sourceMappingURL=sbStyles.js.map