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
import { Panel as OrigPanel, PanelGroup, PanelResizeHandle, } from "react-resizable-panels";
// PKLib Packages
import React, { Fragment } from 'react';
import { arrayJoin, } from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";
import { addClassNames, replaceProps, } from '../../libs/reactUtils.js';
/**
 * This section helps react-resizable-panels
 */
/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each
 */
export function MetaPanelGroup(props) {
    let cprops = addClassNames(props, styles.PanelGroup);
    let LocalResizeHandle = props.ResizeHandle ?? ResizeHandle;
    let children = cprops.children;
    // All children should be Panels
    // How do we enforce that? How do we style that?
    if (Array.isArray(children)) {
        children = arrayJoin(children, LocalResizeHandle({}));
        children = children.map((el, i) => (<Fragment key={i}>{el}</Fragment>));
        cprops.children = children;
    }
    return (
    /* @ts-ignore */
    <PanelGroup {...cprops}/>);
}
/**
 * TODO: Seems like Panel displays should be 'flex', and 'flex-direction: column/row'
 */
export function Panel(props) {
    let cprops = addClassNames(props, styles.Panel);
    return <OrigPanel {...cprops}/>;
}
export function VPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'vertical' });
    cprops = addClassNames(cprops, styles.VPanelGroup);
    return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'horizontal' });
    cprops = addClassNames(cprops, styles.HPanelGroup);
    return MetaPanelGroup(cprops);
}
export function ResizeHandle(props) {
    let cprops = addClassNames(props, styles.ResizeHandle);
    return <PanelResizeHandle {...cprops}/>;
}
//# sourceMappingURL=resizable-components.jsx.map