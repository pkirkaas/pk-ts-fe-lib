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
export declare function KeyFragment(...all: any[]): import("react/jsx-runtime").JSX.Element;
/**
 *
 */
export declare function RenderArr(props: any): import("react/jsx-runtime").JSX.Element;
export declare function TstSelect(): import("react/jsx-runtime").JSX.Element;
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
//# sourceMappingURL=formComponents.d.ts.map