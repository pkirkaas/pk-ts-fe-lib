/**
 * Customization of react-resizable-panels - https://github.com/bvaughn/react-resizable-panels
 */
import { GenObj } from 'pk-ts-common-lib';
/**
 * This section helps react-resizable-panels
 */
/**
 * Simplify & give default style to PanelGroup
 * children ARE ONLY ARRAY OF PANELS - no need to include PanelSeparator between each
 */
export declare function MetaPanelGroup(props: GenObj): import("react/jsx-runtime").JSX.Element;
export declare function VPanelGroup(props: GenObj): import("react/jsx-runtime").JSX.Element;
export declare function HPanelGroup(props: any): import("react/jsx-runtime").JSX.Element;
export declare function PanelSeparator(props: any): import("react/jsx-runtime").JSX.Element;
export declare function ResizeHandle({ className, id, }: {
    className?: string;
    id?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function MyResizeHandle({ className, ...props }: any): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=resizable-components.d.ts.map