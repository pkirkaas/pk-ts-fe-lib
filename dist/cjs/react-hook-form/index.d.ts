/**
 * Helpers for Reach Hook Form components
 */
/**
 * Hmm. General 'options' will be tough.. - like an options builder?
 */
export declare function mkSelect({ register, name, selectedOption, options, all, onSelFncs, ...props }: {
    [x: string]: any;
    register: any;
    name: any;
    selectedOption: any;
    options: any;
    all: any;
    onSelFncs: any;
}): Promise<import("react/jsx-runtime").JSX.Element>;
/**
 * Normalize optional array of "onSelect" functions passed to a select input.
 * Can be empty, or a single function, or array of functions -
 * Returns an array even if empty, so implementors don't have to check
 */
export declare function normOnSelFncs(onSelFncs: any): [];
declare const _default: {
    mkSelect: typeof mkSelect;
    normOnSelFncs: typeof normOnSelFncs;
};
export default _default;
//# sourceMappingURL=index.d.ts.map