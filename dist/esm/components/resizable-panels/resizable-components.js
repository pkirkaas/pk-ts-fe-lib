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
import { PanelGroup, PanelResizeHandle, } from "react-resizable-panels";
// PKLib Packages
import { Fragment } from 'react';
import { arrayJoin, } from 'pk-ts-common-lib';
// Local Packages
import styles from "./resizable.module.css";
import { replaceProps, } from '../../libs/reactUtils.js';
export * from "react-resizable-panels";
/**
 * This section helps react-resizable-panels
 */
/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each
 */
export function MetaPanelGroup(props) {
    //export function MetaPanelGroup(props: any) {
    let cprops = { ...props };
    cprops.className = [props.className, styles.panelGroup].join(" ");
    ;
    let LocalResizeHandle = props.ResizeHandle ?? ResizeHandle;
    let children = cprops.children;
    if (Array.isArray(children)) {
        children = arrayJoin(children, LocalResizeHandle({}));
        children = children.map((el, i) => (_jsx(Fragment, { children: el }, i)));
        cprops.children = children;
    }
    return (
    /* @ts-ignore */
    _jsx(PanelGroup, { ...cprops }));
}
export function VPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'vertical' });
    return MetaPanelGroup(cprops);
}
export function HPanelGroup(props) {
    let cprops = replaceProps(props, { direction: 'horizontal' });
    return MetaPanelGroup(cprops);
}
export function ResizeHandle({ className = "", id, }) {
    return (_jsx(PanelResizeHandle, { className: [styles.ResizeHandle, className].join(" "), id: id }));
}
export function MyResizeHandle({ className = "", ...props }) {
    return _jsx(PanelResizeHandle, { className: `${styles.resizeHandle} ${className}`, ...props });
}
//# sourceMappingURL=resizable-components.js.map