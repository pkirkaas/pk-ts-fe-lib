import React, { useState } from 'react';
import { isEmpty, } from 'pk-ts-common-lib';
import { addProps, replaceProps, } from '../libs/reactUtils.js';
//import React from 'react'
import { signal } from "@preact/signals-react";
import Select from 'react-select'
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";

	const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export function TstSelect() {
 const [selectedOption, setSelectedOption] = useState(null);

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


export function TstArgs1(params) {
  console.log(`in TstArgs1, params:`, params);
  return (
    <h1>Rendered TstArgs1</h1>
  )
}


//export function TstArgs2({ props, context, ref, children }) {
export function TstArgs2( props, context, ref ) {
  console.log(`in TstArgs2, params:`, { props, context, ref  });
  return (
    <h1>Rendered TstArgs2</h1>
  )
}

    //<PanelGroup  direction='horizontal' className="brdr">
      //{cprops.children}

//export function VPanelGroup(props, context, ref) {
export function MetaPanelGroup(props) {
  let mods = { className: 'brdr', style: { flexGrow: 1, width: "100%", height: "100%" } };
  let cprops = addProps(props, mods);
  console.log("In MetaPanelGroup; props:", { props, cprops,});
  return (
     /* @ts-ignore */ 
    <PanelGroup  {...cprops} />
  );
}
export function VPanelGroup(props) {
  return MetaPanelGroup({ ...props, direction: 'vertical' });
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
  return MetaPanelGroup({ ...props, direction: 'horizontal' });
}

export function PanelSeparator(props) {
  let style =  { minHeight: "2px", minWidth: "2px", border: "blue" };
  let cprops = addProps(props, { style });
  return (
    <PanelResizeHandle {...cprops} />
  );
}






