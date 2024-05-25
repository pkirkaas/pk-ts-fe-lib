/**
 * Helpers for Reach Hook Form components
 */

import { useForm, SubmitHandler, } from 'react-hook-form';
import {isEmpty, typeOf, } from 'pk-ts-common-lib';

/**
 * Hmm. General 'options' will be tough.. - like an options builder?
 */
export async function mkSelect({register, name, selectedOption, options, all,onSelFncs, ...props}) {
  return (<h1>Not yet....</h1>);
}




/**
 * Normalize optional array of "onSelect" functions passed to a select input.
 * Can be empty, or a single function, or array of functions - 
 * Returns an array even if empty, so implementors don't have to check
 */
export function normOnSelFncs(onSelFncs):[] {
   if (isEmpty(onSelFncs)) {
      //console.log(`normOnSelFncs: onSelFncs was empty?`, onSelFncs);
      return [];
      //onSelFncs = [];
   }
  if (typeof onSelFncs === 'function') {
      //console.log(`normOnSelFncs: onSelFncs was a function?`, onSelFncs);
      //@ts-ignore
      return [onSelFncs];
   }
   if (!Array.isArray(onSelFncs)) { //Miscalculated somewhere
      let toOSF = typeOf(onSelFncs);
      console.error(`In normOnSelFncs, unexpected opt arg for onSelFncs`, { onSelFncs, toOSF });
      return [];
      //throw new Error("Bad call");
   };
   let toOSF = typeOf(onSelFncs);
//   console.log(`normOnSelFncs: Undisturbed onSelFncs of type::`,{onSelFncs, toOSF});
   //@ts-ignore
   return onSelFncs;
}




export default {mkSelect, normOnSelFncs};
















