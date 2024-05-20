import { jsx as _jsx } from "react/jsx-runtime";
import { isEmpty, typeOf, } from 'pk-ts-common-lib';
/**
 * Hmm. General 'options' will be tough.. - like an options builder?
 */
export async function mkSelect({ register, name, selectedOption, options, all, onSelFncs, ...props }) {
    return (_jsx("h1", { children: "Not yet...." }));
}
/**
 * Normalize optional array of "onSelect" functions passed to a select input.
 * Can be empty, or a single function, or array of functions -
 * Returns an array even if empty, so implementors don't have to check
 */
export function normOnSelFncs(onSelFncs) {
    if (isEmpty(onSelFncs)) {
        onSelFncs = [];
    }
    else if (typeof onSelFncs === 'function') {
        onSelFncs = [onSelFncs];
    }
    if (!Array.isArray(onSelFncs)) { //Miscalculated somewhere
        let toOSF = typeOf(onSelFncs);
        console.error(`In normOnSelFncs, unexpected opt arg for onSelFncs`, { onSelFncs, toOSF });
        throw new Error("Bad call");
    }
    ;
    return onSelFncs;
}
export default { mkSelect, normOnSelFncs };
//# sourceMappingURL=index.js.map