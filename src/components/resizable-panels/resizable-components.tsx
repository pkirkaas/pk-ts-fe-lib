/**
 * Customization of react-resizable-panels - https://github.com/bvaughn/react-resizable-panels
 */

// NPM Packages
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";

// PKLib Packages

import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty, typeOfEach, getProps, typeOf, GenObj, insertBetween, } from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";

import { addProps, replaceProps, getCnt, } from '../../libs/reactUtils.js';

/**
 * This section helps react-resizable-panels
 */

/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each 
 */
export function MetaPanelGroup(props: GenObj) {
  /*
  let mods = { className: 'brdr', style: { 
    // Debugging
    border: "solid red 2px",
    flexGrow: 1, width: "100%", height: "100%" 
  } };
  let cprops = addProps(props, mods);
  */
 let cprops = props;
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
export function VPanelGroup(props: GenObj) {
  let cprops = replaceProps(props, { direction: 'vertical' });
  return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
  let cprops = replaceProps(props, { direction: 'horizontal' });
  return MetaPanelGroup(cprops);
}

export function PanelSeparator(props) {
  let style = { minHeight: "2px", minWidth: "2px", border: "blue" };
  let cprops = addProps(props, { style });
  /*
  return (
    <PanelResizeHandle {...cprops} />
  );
  */
  return (
    <ResizeHandle {...cprops} />
  );
}


export function ResizeHandle({
  className = "",
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandle, className].join(" ")}
      id={id}
    />
  );
}
export function MyResizeHandle({ className, ...props }: any) {
  return <div className={`${styles.resizeHandle} ${className}`} {...props} />;
}
















