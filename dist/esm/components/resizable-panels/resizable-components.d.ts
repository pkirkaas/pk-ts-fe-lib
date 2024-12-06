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
import { PanelGroupProps } from "react-resizable-panels";
export type PkPGProps = Partial<PanelGroupProps & {
    ResizeHandle?: any;
    children?: any;
}>;
export * from "react-resizable-panels";
/**
 * This section helps react-resizable-panels
 */
/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each
 */
export declare function MetaPanelGroup(props: PkPGProps): import("react/jsx-runtime").JSX.Element;
export declare function VPanelGroup(props: PkPGProps): import("react/jsx-runtime").JSX.Element;
export declare function HPanelGroup(props: any): import("react/jsx-runtime").JSX.Element;
export declare function ResizeHandle(props: any): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=resizable-components.d.ts.map