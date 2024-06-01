/**
 * Not sure this should work...
 */

import {runCli} from 'pk-ts-node-lib';

export let tstFncs = {
  tsta() {
    console.log("In tsta");
  },
  tstb() {
    console.log("In tstb");
  },
};

runCli(tstFncs);