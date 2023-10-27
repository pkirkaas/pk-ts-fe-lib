import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Fragment } from 'react';
import { typeOf, } from 'pk-ts-common-lib';
import { addProps, replaceProps, getCnt, } from '../libs/reactUtils.js';
import Select from 'react-select';
import { PanelGroup, PanelResizeHandle, } from "react-resizable-panels";
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
export function KeyFragment(...all) {
    let props = all[0];
    //props.key =
    /*
    if (!props.key) {
      props.key = getCnt();
    }
    */
    //return Fragment(props);
    //  console.log("In KeyFragement - props:", { props, all });
    return _jsx(Fragment, { ...props });
}
export function BaseComp(props = {}) {
    let tstKey = props.key;
    let nextKey = getCnt();
    //console.log('In BaseComp', { tstKey, nextKey });
    if (!("key" in props)) {
        props.key = getCnt();
    }
    let key = props.key;
    let children = props.children;
    return KeyFragment({ key, children });
}
export function DataRow(props) {
    let { label, data, wrapClass, labelClass, dataClass } = props;
    if (!data) {
        return _jsx(Fragment, {});
    }
    wrapClass = wrapClass ?? "LabelRowWrapper";
    labelClass = labelClass ?? "LabelLabelWrapper";
    dataClass = dataClass ?? "DataItemWrapper";
    return (_jsxs("div", { className: wrapClass, children: [_jsx("div", { className: labelClass, children: label }), _jsx("div", { className: dataClass, children: data })] }, getCnt()));
}
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
    return (_jsx("div", { className: "App", children: _jsx(Select, { defaultValue: selectedOption, onChange: setSelectedOption, options: options }) }));
}
export function TstArgs1(params) {
    console.log(`in TstArgs1, params:`, params);
    return (_jsx("h1", { children: "Rendered TstArgs1" }));
}
//export function TstArgs2({ props, context, ref, children }) {
export function TstArgs2(props, context, ref) {
    console.log(`in TstArgs2, params:`, { props, context, ref });
    return (_jsx("h1", { children: "Rendered TstArgs2" }));
}
//<PanelGroup  direction='horizontal' className="brdr">
//{cprops.children}
//export function VPanelGroup(props, context, ref) {
export function MetaPanelGroup(props) {
    let mods = { className: 'brdr', style: { flexGrow: 1, width: "100%", height: "100%" } };
    let cprops = addProps(props, mods);
    let kids = cprops.children;
    let tok = typeOf(kids);
    let kidTypes = kids.map((el) => typeOf(el));
    console.log("In MetaPanelGroup; props:", { tok, cprops, kidTypes });
    return (
    /* @ts-ignore */
    _jsx(PanelGroup, { ...cprops }));
}
export function VPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'vertical' });
    return MetaPanelGroup(cprops);
    /*
    let cprops = { ...props };
    if (isEmpty(cprops.style)) {
      cprops.style = {};
    }
    cprops.style = { ...cprops.style, flexGrow: 1,  width: "100%", height: "100%" };
    */
    //  console.log("In VPanelGroup; props:", { props, cprops,});
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
//# sourceMappingURL=formComponents.js.map