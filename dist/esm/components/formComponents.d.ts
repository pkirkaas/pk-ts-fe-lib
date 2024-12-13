/**
 * Utility Components for PkLib
 */
import React from 'react';
export declare const SDiv: any;
/** TODO: Can styles be a template literal? How?  */
export declare function mkStyled(cmp: any, styles: any): any;
export declare function KeyFragment(...all: any[]): React.JSX.Element;
/**
 *
 */
export declare function RenderArr(props: any): React.JSX.Element;
export declare function TstSelect(): React.JSX.Element;
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