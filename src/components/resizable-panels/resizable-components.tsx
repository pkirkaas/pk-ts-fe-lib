"use client";
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
import { Panel as OrigPanel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";

export type PkPGProps = Partial<PanelGroupProps & {ResizeHandle?: any, children?:any}>;

// PKLib Packages

import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty, typeOfEach, getProps, typeOf, GenObj, insertBetween, 
  arrayJoin,
} from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";

import { addProps, addClassNames, replaceProps, addDefaultStyle } from '../../libs/reactUtils.js';


/**
 * This section helps react-resizable-panels
 */

/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each 
 */
export function MetaPanelGroup(props: PkPGProps) {
  let cprops = addClassNames(props, styles.PanelGroup);
  let LocalResizeHandle = props.ResizeHandle ?? ResizeHandle;
  let children = cprops.children;
  // All children should be Panels
  // How do we enforce that? How do we style that?
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

/**
 * Panel `defaultSize`:optional percentage of group total. If all Panels have defaultSize, must add  * up to 100 - else, any panels w/o default size will share the remaining from those with.
 * TODO: Seems like Panel displays should be 'flex', and 'flex-direction: column/row'
 */

export function Panel(props) {
  let cprops = addClassNames(props, styles.Panel);
  //cprops.defaultSize = cprops.defaultSize ?? 50;
  return <OrigPanel {...cprops} />;
}
export function VPanelGroup(props: PkPGProps) {
  let cprops = replaceProps(props, { direction: 'vertical' }) as PkPGProps;
  cprops = addClassNames(cprops, styles.VPanelGroup);
  return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
  let cprops = replaceProps(props, { direction: 'horizontal' }) as PkPGProps;
  cprops = addClassNames(cprops, styles.HPanelGroup);
  return MetaPanelGroup(cprops);
}


export function ResizeHandle(props) {
  let cprops = addClassNames(props, styles.ResizeHandle);
  return <PanelResizeHandle {...cprops} />;
}


export function TstTw(props) {
  return (
    <div className="text-red-600 text-xl p-2 m-2 border border-black bg-blue-200 font-extrabold">
      This is Tailwind Styled!
      </div>
  );
}














