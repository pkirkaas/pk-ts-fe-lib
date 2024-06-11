/**
 * Not sure this should work...
 */
//import {styleUtils} from '../index.js';
//import {styleUtils} from '../libs/styleUtils.js';
import { StyleBuilder, } from '../libs/styleUtils.js';
//let {StyleBuilder,} = styleUtils;
import { runCli } from 'pk-ts-node-lib';
export let tstFncs = {
    tsta() {
        console.log("In tsta");
    },
    tstb() {
        console.log("In tstb");
    },
    tstSB() {
        let sb = StyleBuilder.builder;
        //let fl = sb.flex({wr:'nw'});
        let fl = sb.flex();
        console.log("sb:", { fl });
    },
};
runCli(tstFncs);
//# sourceMappingURL=tstcli.js.map