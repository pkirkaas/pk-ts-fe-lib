/**
 * Utility Components for PkLib 
 */
import React, { useState, useEffect, Fragment  } from 'react';
import { isEmpty, typeOf, GenObj, insertBetween,} from 'pk-ts-common-lib';
import { addProps, replaceProps, getCnt, } from '../libs/reactUtils.js';
import { signal } from "@preact/signals-react";
import Select from 'react-select'
import { styled }  from 'styled-components';
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";



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
export function MetaPanelGroup(props:GenObj) {
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
    <PanelGroup  {...cprops} />
  );
}
export function VPanelGroup(props:GenObj) {
  let cprops = replaceProps(props,{direction:'vertical'});
  return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
  let cprops = replaceProps(props,{direction:'vertical'});
  return MetaPanelGroup(cprops);
}

export function PanelSeparator(props) {
  let style =  { minHeight: "2px", minWidth: "2px", border: "blue" };
  let cprops = addProps(props, { style });
  return (
    <PanelResizeHandle {...cprops} />
  );
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
