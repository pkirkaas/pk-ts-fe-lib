/**
 * Utility Components for PkLib
 */
import React from 'react';
import { GenObj } from 'pk-ts-common-lib';
export declare const SDiv: import("styled-components").IStyledComponent<"web", {
    ref?: React.LegacyRef<HTMLDivElement>;
    key?: React.Key;
    defaultChecked?: boolean;
    defaultValue?: string | number | readonly string[];
    suppressContentEditableWarning?: boolean;
    suppressHydrationWarning?: boolean;
    accessKey?: string;
    autoFocus?: boolean;
    className?: string;
    contentEditable?: "inherit" | (boolean | "false" | "true") | "plaintext-only";
    contextMenu?: string;
    dir?: string;
    draggable?: boolean | "false" | "true";
    hidden?: boolean;
    id?: string;
    lang?: string;
    nonce?: string;
    placeholder?: string;
    slot?: string;
    spellCheck?: boolean | "false" | "true";
    style?: React.CSSProperties;
    tabIndex?: number;
    title?: string;
    translate?: "yes" | "no";
    radioGroup?: string;
    role?: React.AriaRole;
    about?: string;
    content?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    rel?: string;
    resource?: string;
    rev?: string;
    typeof?: string;
    vocab?: string;
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: "off" | "on";
    inputMode?: "search" | "text" | "url" | "none" | "tel" | "email" | "numeric" | "decimal";
    is?: string;
    "aria-activedescendant"?: string;
    "aria-atomic"?: boolean | "false" | "true";
    "aria-autocomplete"?: "none" | "list" | "inline" | "both";
    "aria-braillelabel"?: string;
    "aria-brailleroledescription"?: string;
    "aria-busy"?: boolean | "false" | "true";
    "aria-checked"?: boolean | "false" | "true" | "mixed";
    "aria-colcount"?: number;
    "aria-colindex"?: number;
    "aria-colindextext"?: string;
    "aria-colspan"?: number;
    "aria-controls"?: string;
    "aria-current"?: boolean | "time" | "false" | "true" | "step" | "page" | "location" | "date";
    "aria-describedby"?: string;
    "aria-description"?: string;
    "aria-details"?: string;
    "aria-disabled"?: boolean | "false" | "true";
    "aria-dropeffect"?: "link" | "none" | "copy" | "execute" | "move" | "popup";
    "aria-errormessage"?: string;
    "aria-expanded"?: boolean | "false" | "true";
    "aria-flowto"?: string;
    "aria-grabbed"?: boolean | "false" | "true";
    "aria-haspopup"?: boolean | "dialog" | "menu" | "false" | "true" | "grid" | "listbox" | "tree";
    "aria-hidden"?: boolean | "false" | "true";
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
    "aria-keyshortcuts"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-level"?: number;
    "aria-live"?: "off" | "assertive" | "polite";
    "aria-modal"?: boolean | "false" | "true";
    "aria-multiline"?: boolean | "false" | "true";
    "aria-multiselectable"?: boolean | "false" | "true";
    "aria-orientation"?: "vertical" | "horizontal";
    "aria-owns"?: string;
    "aria-placeholder"?: string;
    "aria-posinset"?: number;
    "aria-pressed"?: boolean | "false" | "true" | "mixed";
    "aria-readonly"?: boolean | "false" | "true";
    "aria-relevant"?: "text" | "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals";
    "aria-required"?: boolean | "false" | "true";
    "aria-roledescription"?: string;
    "aria-rowcount"?: number;
    "aria-rowindex"?: number;
    "aria-rowindextext"?: string;
    "aria-rowspan"?: number;
    "aria-selected"?: boolean | "false" | "true";
    "aria-setsize"?: number;
    "aria-sort"?: "none" | "ascending" | "descending" | "other";
    "aria-valuemax"?: number;
    "aria-valuemin"?: number;
    "aria-valuenow"?: number;
    "aria-valuetext"?: string;
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: {
        __html: string | TrustedHTML;
    };
    onCopy?: React.ClipboardEventHandler<HTMLDivElement>;
    onCopyCapture?: React.ClipboardEventHandler<HTMLDivElement>;
    onCut?: React.ClipboardEventHandler<HTMLDivElement>;
    onCutCapture?: React.ClipboardEventHandler<HTMLDivElement>;
    onPaste?: React.ClipboardEventHandler<HTMLDivElement>;
    onPasteCapture?: React.ClipboardEventHandler<HTMLDivElement>;
    onCompositionEnd?: React.CompositionEventHandler<HTMLDivElement>;
    onCompositionEndCapture?: React.CompositionEventHandler<HTMLDivElement>;
    onCompositionStart?: React.CompositionEventHandler<HTMLDivElement>;
    onCompositionStartCapture?: React.CompositionEventHandler<HTMLDivElement>;
    onCompositionUpdate?: React.CompositionEventHandler<HTMLDivElement>;
    onCompositionUpdateCapture?: React.CompositionEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onFocusCapture?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onBlurCapture?: React.FocusEventHandler<HTMLDivElement>;
    onChange?: React.FormEventHandler<HTMLDivElement>;
    onChangeCapture?: React.FormEventHandler<HTMLDivElement>;
    onBeforeInput?: React.FormEventHandler<HTMLDivElement>;
    onBeforeInputCapture?: React.FormEventHandler<HTMLDivElement>;
    onInput?: React.FormEventHandler<HTMLDivElement>;
    onInputCapture?: React.FormEventHandler<HTMLDivElement>;
    onReset?: React.FormEventHandler<HTMLDivElement>;
    onResetCapture?: React.FormEventHandler<HTMLDivElement>;
    onSubmit?: React.FormEventHandler<HTMLDivElement>;
    onSubmitCapture?: React.FormEventHandler<HTMLDivElement>;
    onInvalid?: React.FormEventHandler<HTMLDivElement>;
    onInvalidCapture?: React.FormEventHandler<HTMLDivElement>;
    onLoad?: React.ReactEventHandler<HTMLDivElement>;
    onLoadCapture?: React.ReactEventHandler<HTMLDivElement>;
    onError?: React.ReactEventHandler<HTMLDivElement>;
    onErrorCapture?: React.ReactEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyDownCapture?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyPressCapture?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyUpCapture?: React.KeyboardEventHandler<HTMLDivElement>;
    onAbort?: React.ReactEventHandler<HTMLDivElement>;
    onAbortCapture?: React.ReactEventHandler<HTMLDivElement>;
    onCanPlay?: React.ReactEventHandler<HTMLDivElement>;
    onCanPlayCapture?: React.ReactEventHandler<HTMLDivElement>;
    onCanPlayThrough?: React.ReactEventHandler<HTMLDivElement>;
    onCanPlayThroughCapture?: React.ReactEventHandler<HTMLDivElement>;
    onDurationChange?: React.ReactEventHandler<HTMLDivElement>;
    onDurationChangeCapture?: React.ReactEventHandler<HTMLDivElement>;
    onEmptied?: React.ReactEventHandler<HTMLDivElement>;
    onEmptiedCapture?: React.ReactEventHandler<HTMLDivElement>;
    onEncrypted?: React.ReactEventHandler<HTMLDivElement>;
    onEncryptedCapture?: React.ReactEventHandler<HTMLDivElement>;
    onEnded?: React.ReactEventHandler<HTMLDivElement>;
    onEndedCapture?: React.ReactEventHandler<HTMLDivElement>;
    onLoadedData?: React.ReactEventHandler<HTMLDivElement>;
    onLoadedDataCapture?: React.ReactEventHandler<HTMLDivElement>;
    onLoadedMetadata?: React.ReactEventHandler<HTMLDivElement>;
    onLoadedMetadataCapture?: React.ReactEventHandler<HTMLDivElement>;
    onLoadStart?: React.ReactEventHandler<HTMLDivElement>;
    onLoadStartCapture?: React.ReactEventHandler<HTMLDivElement>;
    onPause?: React.ReactEventHandler<HTMLDivElement>;
    onPauseCapture?: React.ReactEventHandler<HTMLDivElement>;
    onPlay?: React.ReactEventHandler<HTMLDivElement>;
    onPlayCapture?: React.ReactEventHandler<HTMLDivElement>;
    onPlaying?: React.ReactEventHandler<HTMLDivElement>;
    onPlayingCapture?: React.ReactEventHandler<HTMLDivElement>;
    onProgress?: React.ReactEventHandler<HTMLDivElement>;
    onProgressCapture?: React.ReactEventHandler<HTMLDivElement>;
    onRateChange?: React.ReactEventHandler<HTMLDivElement>;
    onRateChangeCapture?: React.ReactEventHandler<HTMLDivElement>;
    onResize?: React.ReactEventHandler<HTMLDivElement>;
    onResizeCapture?: React.ReactEventHandler<HTMLDivElement>;
    onSeeked?: React.ReactEventHandler<HTMLDivElement>;
    onSeekedCapture?: React.ReactEventHandler<HTMLDivElement>;
    onSeeking?: React.ReactEventHandler<HTMLDivElement>;
    onSeekingCapture?: React.ReactEventHandler<HTMLDivElement>;
    onStalled?: React.ReactEventHandler<HTMLDivElement>;
    onStalledCapture?: React.ReactEventHandler<HTMLDivElement>;
    onSuspend?: React.ReactEventHandler<HTMLDivElement>;
    onSuspendCapture?: React.ReactEventHandler<HTMLDivElement>;
    onTimeUpdate?: React.ReactEventHandler<HTMLDivElement>;
    onTimeUpdateCapture?: React.ReactEventHandler<HTMLDivElement>;
    onVolumeChange?: React.ReactEventHandler<HTMLDivElement>;
    onVolumeChangeCapture?: React.ReactEventHandler<HTMLDivElement>;
    onWaiting?: React.ReactEventHandler<HTMLDivElement>;
    onWaitingCapture?: React.ReactEventHandler<HTMLDivElement>;
    onAuxClick?: React.MouseEventHandler<HTMLDivElement>;
    onAuxClickCapture?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
    onContextMenuCapture?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClickCapture?: React.MouseEventHandler<HTMLDivElement>;
    onDrag?: React.DragEventHandler<HTMLDivElement>;
    onDragCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React.DragEventHandler<HTMLDivElement>;
    onDragEndCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragEnter?: React.DragEventHandler<HTMLDivElement>;
    onDragEnterCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragExit?: React.DragEventHandler<HTMLDivElement>;
    onDragExitCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragLeave?: React.DragEventHandler<HTMLDivElement>;
    onDragLeaveCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragOver?: React.DragEventHandler<HTMLDivElement>;
    onDragOverCapture?: React.DragEventHandler<HTMLDivElement>;
    onDragStart?: React.DragEventHandler<HTMLDivElement>;
    onDragStartCapture?: React.DragEventHandler<HTMLDivElement>;
    onDrop?: React.DragEventHandler<HTMLDivElement>;
    onDropCapture?: React.DragEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseDownCapture?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
    onMouseMoveCapture?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOutCapture?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOverCapture?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUpCapture?: React.MouseEventHandler<HTMLDivElement>;
    onSelect?: React.ReactEventHandler<HTMLDivElement>;
    onSelectCapture?: React.ReactEventHandler<HTMLDivElement>;
    onTouchCancel?: React.TouchEventHandler<HTMLDivElement>;
    onTouchCancelCapture?: React.TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
    onTouchEndCapture?: React.TouchEventHandler<HTMLDivElement>;
    onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
    onTouchMoveCapture?: React.TouchEventHandler<HTMLDivElement>;
    onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
    onTouchStartCapture?: React.TouchEventHandler<HTMLDivElement>;
    onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
    onPointerDownCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
    onPointerMoveCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
    onPointerUpCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerCancel?: React.PointerEventHandler<HTMLDivElement>;
    onPointerCancelCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
    onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerOver?: React.PointerEventHandler<HTMLDivElement>;
    onPointerOverCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerOut?: React.PointerEventHandler<HTMLDivElement>;
    onPointerOutCapture?: React.PointerEventHandler<HTMLDivElement>;
    onGotPointerCapture?: React.PointerEventHandler<HTMLDivElement>;
    onGotPointerCaptureCapture?: React.PointerEventHandler<HTMLDivElement>;
    onLostPointerCapture?: React.PointerEventHandler<HTMLDivElement>;
    onLostPointerCaptureCapture?: React.PointerEventHandler<HTMLDivElement>;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    onScrollCapture?: React.UIEventHandler<HTMLDivElement>;
    onWheel?: React.WheelEventHandler<HTMLDivElement>;
    onWheelCapture?: React.WheelEventHandler<HTMLDivElement>;
    onAnimationStart?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationStartCapture?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationEndCapture?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationIteration?: React.AnimationEventHandler<HTMLDivElement>;
    onAnimationIterationCapture?: React.AnimationEventHandler<HTMLDivElement>;
    onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
    onTransitionEndCapture?: React.TransitionEventHandler<HTMLDivElement>;
}>;
export declare function mkStyled(cmp: any, styles: any): any;
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