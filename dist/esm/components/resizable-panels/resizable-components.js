"use client";
import { jsx as _jsx } from "react/jsx-runtime";
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
import { Fragment } from 'react';
import { arrayJoin, } from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";
//import styles from "@/components/resizable-panels/resizable.module.css";
import { addClassNames, replaceProps, } from '../../libs/reactUtils.js';
//export * from "react-resizable-panels";
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
        children = children.map((el, i) => (_jsx(Fragment, { children: el }, i)));
        cprops.children = children;
    }
    return (
    /* @ts-ignore */
    _jsx(PanelGroup, { ...cprops }));
}
/**
 * TODO: Seems like Panel displays should be 'flex', and 'flex-direction: column/row'
 */
export function Panel(props) {
    let cprops = addClassNames(props, styles.Panel);
    return _jsx(OrigPanel, { ...cprops });
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
    return _jsx(PanelResizeHandle, { ...cprops });
}
//# sourceMappingURL=resizable-components.js.map