/**
 * Utility Components for PkLib 
 */
import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty, typeOfEach, getProps, typeOf, GenObj, insertBetween, } from 'pk-ts-common-lib';
import { addProps, replaceProps, getCnt, } from '../libs/reactUtils.js';
import { signal } from "@preact/signals-react";
import Select from 'react-select'
import { styled } from 'styled-components';

import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";
//import {  ResizeHandle,} from "react-resizable-panels/website";



//////////// Testing styled components

//export const SDiv = styled.div`border: solid red 2px; `
// THIS STOPPED WORKING - something with interfaces, whatever...
export const SDiv: any = styled.div({ border: 'solid blue 2px' });

/** TODO: Can styles be a template literal? How?  */
export function mkStyled(cmp, styles): any {
//  analyzeSS();
  return styled(cmp)(styles);
}



//?? Not sure what's up?
export function KeyFragment(...all) {
  let props = all[0];
  return <Fragment {...props} />;
}


/**
 * 
 */
export function RenderArr(props) {
  let label = props.label;
  let Comp = props.Comp;
  let arr: any[] = props.arr;
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
      let myArr: any[] = arr;
      //@ts-ignore
      arrOut = myArr.map((el, idx) => {
        return <Fragment key={idx}>{Comp({ key: idx, ...el, className: compClass })}</Fragment>;
      });
    }
  } catch (e) {
    let stack = e.stack;
    let stackArr = stack.split("\n");
    let msg = e.message;
    console.error("Caught the error here:", { msg, stackArr });
  }
  return (
    <div className={wrapClass}>
      <div className={labelClass}>{label}</div>
      <div className={arrClass}>{arrOut}</div>
    </div>
  );
}
















export function TstSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}






/**
 * // Any useful here? 
export function BaseComp(props: GenObj = {}) {
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
    return <Fragment />;
  }
  wrapClass = wrapClass ?? "LabelRowWrapper";
  labelClass = labelClass ?? "LabelLabelWrapper";
  dataClass = dataClass ?? "DataItemWrapper";
  return (
    <div key={getCnt()} className={wrapClass}>
      <div className={labelClass}>{label}</div>
      <div className={dataClass}>{data}</div>
    </div>
  );
}

 */
