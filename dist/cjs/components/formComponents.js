import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Utility Components for PkLib
 */
import { useState, Fragment } from 'react';
import { addProps, replaceProps, } from '../libs/reactUtils.js';
import Select from 'react-select';
import { styled } from 'styled-components';
import { PanelGroup, PanelResizeHandle, } from "react-resizable-panels";
//////////// Testing styled components
//export const SDiv = styled.div`border: solid red 2px; `
export const SDiv = styled.div({ border: 'solid blue 2px' });
export function mkStyled(cmp, styles) {
    return styled(cmp)(styles);
}
/**
 * This section helps react-resizable-panels
 */
/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each
 */
export function MetaPanelGroup(props) {
    let mods = { className: 'brdr', style: { flexGrow: 1, width: "100%", height: "100%" } };
    let cprops = addProps(props, mods);
    /*
    let kids = cprops.children;
    let tok = typeOf(kids);
    let kidTypes = kids.map((el) => typeOf(el));
  
    console.log("In MetaPanelGroup; props:", { tok, cprops, kidTypes});
    */
    return (
    /* @ts-ignore */
    _jsx(PanelGroup, { ...cprops }));
}
export function VPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'vertical' });
    return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'vertical' });
    return MetaPanelGroup(cprops);
}
export function PanelSeparator(props) {
    let style = { minHeight: "2px", minWidth: "2px", border: "blue" };
    let cprops = addProps(props, { style });
    return (_jsx(PanelResizeHandle, { ...cprops }));
}
//?? Not sure what's up?
export function KeyFragment(...all) {
    let props = all[0];
    return _jsx(Fragment, { ...props });
}
/**
 *
 */
export function RenderArr(props) {
    let label = props.label;
    let Comp = props.Comp;
    let arr = props.arr;
    //let labelClass = props.labelClass ?? "clabel";
    let labelClass = props.labelClass ?? "RenderArrLabel";
    let wrapClass = props.wrapClass ?? "bpm";
    let arrClass = props.arrClass ?? "bpm2";
    let compClass = props.compClass ?? "crow";
    //console.log("In RA, TOC:", toComp);
    if (!arr || !Array.isArray(arr) || !arr.length) {
        return _jsx(Fragment, {});
    }
    let arrOut = _jsx(Fragment, {});
    try {
        if (Array.isArray(arr)) {
            let myArr = arr;
            //@ts-ignore
            arrOut = myArr.map((el, idx) => {
                return _jsx(Fragment, { children: Comp({ key: idx, ...el, className: compClass }) }, idx);
            });
        }
    }
    catch (e) {
        let stack = e.stack;
        let stackArr = stack.split("\n");
        let msg = e.message;
        console.error("Caught the error here:", { msg, stackArr });
    }
    return (_jsxs("div", { className: wrapClass, children: [_jsx("div", { className: labelClass, children: label }), _jsx("div", { className: arrClass, children: arrOut })] }));
}
export function TstSelect() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    return (_jsx("div", { className: "App", children: _jsx(Select, { defaultValue: selectedOption, onChange: setSelectedOption, options: options }) }));
}
//# sourceMappingURL=formComponents.js.map