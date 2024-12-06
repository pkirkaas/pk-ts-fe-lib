/**
 * Customization/simplification of react-resizable-panels 
 *  https://github.com/bvaughn/react-resizable-panels
 * 
 * H/VPanelGroup Children don't need ResizeHandles between Panels
 * Default, customizable ResizeHandle provided
 * Main Exports:
 *   VPanelGroup
 *   HPanelGroup
 *   ResizeHandle
 * 
 */

// NPM Packages
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";

export type PkPGProps = Partial<PanelGroupProps & {ResizeHandle?: any, children?:any}>;

// PKLib Packages

import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty, typeOfEach, getProps, typeOf, GenObj, insertBetween, 
  arrayJoin,
} from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";

import { addProps, addClassNames, replaceProps, getCnt, } from '../../libs/reactUtils.js';

export * from "react-resizable-panels";

/**
 * This section helps react-resizable-panels
 */

/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each 
 */
export function MetaPanelGroup(props: PkPGProps) {
//export function MetaPanelGroup(props: any) {
  let cprops = {...props};
  cprops.className = [props.className, styles.panelGroup].join(" ");;
  let LocalResizeHandle = props.ResizeHandle ?? ResizeHandle;
  let children = cprops.children;
  if (Array.isArray(children)) {
    children = arrayJoin(children, LocalResizeHandle({}))
    children = children.map((el, i) => (<Fragment key={i}>{el}</Fragment>));
    cprops.children = children;
  }
  return (
    /* @ts-ignore */
    <PanelGroup  {...cprops} />
  );
}
export function VPanelGroup(props: PkPGProps) {
  let cprops = replaceProps(props, { direction: 'vertical' }) as PkPGProps;
  return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
  let cprops = replaceProps(props, { direction: 'horizontal' }) as PkPGProps;
  return MetaPanelGroup(cprops);
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
export function MyResizeHandle({ className="", ...props }: any) {
  return <PanelResizeHandle className={`${styles.resizeHandle} ${className}`} {...props} />;
}
















