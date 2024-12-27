/**
 * Some tests...
 */
import { runCli, stdOut, } from 'pk-ts-node-lib';
// Local Imports
import { StyleBuilder, cxsb, } from '../libs/styleUtils.js';
import { safelist, } from '../libs/tailwind-utils.js';
import { //tstJsdom, 
mkClassNames, tstStylesFromCNames } from '../libs/emotionTests.js';
// Some test data
let sStyle = {
    display: 'block',
    color: 'red',
};
let sbStyle = StyleBuilder.builder.d('b').fs('lg').c('blue').m(9).p(5).br({ color: 'red', radius: 5, width: 10, which: "v" });
let cnStr = 'test-class-name';
let cxsbTstObj = {
    sStyle,
    sbStyle,
    cnStr,
};
export let tstFncs = {
    twConf() {
        console.log("In twConf", { safelist });
    },
    tstSFC() {
        stdOut("\n\nIn tstSFC\n");
        tstStylesFromCNames();
        stdOut("\n\nDONE tstSFC\n\n");
    },
    /*
    tstJsdom() {
      tstJsdom();
    },
    */
    tstMkClassNames() {
        let cnames = mkClassNames();
        console.log({ cnames });
    },
    tstCxsb: () => {
        let tstNames = Object.keys(cxsbTstObj);
        let tstNamesStr = tstNames.join(', ');
        let tstArgs = Object.values(cxsbTstObj);
        console.log(`\nin tstCxsb tsting cxsb [${tstNamesStr}]\n`, { tstArgs });
        let reses = {
            resSpread: `\n[${cxsb(...tstArgs)}]\n`,
            //     resArr:`\n[${cxsb(tstArgs)}]\n`,
        };
        stdOut('\n\n');
        for (let res in reses) {
            stdOut(`\n${res}: ${reses[res]}\n`);
        }
        stdOut('\n\n');
        //console.log({resSpread, resArr}, '\n');
    },
    tsta() {
        console.log("In tsta");
    },
    tstb() {
        console.log("In tstb");
    },
    tstFlex() {
        let fOpts = { fd: 'c', wr: 'n', ai: 'c', jc: 'b', };
        //let fOpts = {fd:'c', wr:'n', ai:'c', jc:'just-weird',};
        //let fs1 = StyleBuilder.builder.flex(fOpts);
        //let fs1 = StyleBuilder.builder.d(fOpts);
        let fs1 = StyleBuilder.builder.d('b');
        fs1.fs('lg').c('blue').m(9).p(5).br({ color: 'red', radius: 5, width: 10, which: "v" });
        fs1.fgbg(3).fs('large').fw('bold');
        let style = fs1.style;
        console.log(`style:`, { style });
    },
    /*
  tstSB() {
    let rowSgStyle = StyleBuilder.builder.flexa('s').flexj('g').m(3).p(3).bg('#222').flexd('r').fgbg(2);
    let colSgStyle = StyleBuilder.builder.flexa('s').flexj('g').m(3).p(3).bg('#222').flexd('c').fgbg(1);
    let rcStyles: GenObj = {
      rowSg: rowSgStyle,
      rowCc: rowSgStyle.clone.flexa('c').flexj('c'),
      rowGg: rowSgStyle.clone.flexa('g').flexj('g'),
      rowCg: rowSgStyle.clone.flexa('c').flexj('g'),
      rowGc: rowSgStyle.clone.flexa('g').flexj('c'),
      rowSs: rowSgStyle.clone.flexa('s').flexj('s'),
      colSg: colSgStyle.clone,
      colCc: colSgStyle.clone.flexa('c').flexj('c'),
      colSs: colSgStyle.clone.flexa('s').flexj('s'),
      colSc: colSgStyle.clone.flexa('s').flexj('c'),
    };
    let rSgCml = rowSgStyle.style;
    let cSgCml = colSgStyle.style;

    let jsStyles: GenObj = {};
    for (let key in rcStyles) {
      jsStyles[key] = rcStyles[key].style;
    }

    console.log({ jsStyles });
    //console.log({ rSgCml, cSgCml, });

  },
    */
    /*
    tstSB() {
      let sb = StyleBuilder.builder;
      //let fl = sb.flex({wr:'nw'});
      let fl = sb.flex();
      let style = fl.style;
      let camel = fl.camelled;
      console.log("sb:", {style,camel});
    },
    */
    /*
    tstBS() {
      buildFlexStyles();
    },
    */
};
runCli(tstFncs);
//# sourceMappingURL=tstcli.js.map