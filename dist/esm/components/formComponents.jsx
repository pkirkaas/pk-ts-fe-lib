"use client";
/**
 * Utility Components for PkLib
 */
import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import { styled } from 'styled-components';
//import {  ResizeHandle,} from "react-resizable-panels/website";
//////////// Testing styled components
//export const SDiv = styled.div`border: solid red 2px; `
// THIS STOPPED WORKING - something with interfaces, whatever...
export const SDiv = styled.div({ border: 'solid blue 2px' });
/** TODO: Can styles be a template literal? How?  */
export function mkStyled(cmp, styles) {
    //  analyzeSS();
    return styled(cmp)(styles);
}
//?? Not sure what's up?
export function KeyFragment(...all) {
    let props = all[0];
    return <Fragment {...props}/>;
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
        return <Fragment />;
    }
    let arrOut = <Fragment />;
    try {
        if (Array.isArray(arr)) {
            let myArr = arr;
            //@ts-ignore
            arrOut = myArr.map((el, idx) => {
                return <Fragment key={idx}>{Comp({ key: idx, ...el, className: compClass })}</Fragment>;
            });
        }
    }
    catch (e) {
        let stack = e.stack;
        let stackArr = stack.split("\n");
        let msg = e.message;
        console.error("Caught the error here:", { msg, stackArr });
    }
    return (<div className={wrapClass}>
      <div className={labelClass}>{label}</div>
      <div className={arrClass}>{arrOut}</div>
    </div>);
}
export function TstSelect() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    return (<div className="App">
      <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options}/>
    </div>);
}
//# sourceMappingURL=formComponents.jsx.map