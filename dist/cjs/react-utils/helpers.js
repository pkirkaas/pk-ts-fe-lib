import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Needs work - but play w. RenderArray - it has potential...
 */
import { Fragment } from 'react';
/*
export function Client(props) {
  let out = <div className="dlabel">...Waiting'</div>;
  if (props.name) {
    let name = props.name;
    let about = props.about;
    let projects = props.projects;
    out = (
      <div className="crow">
        <div className="cname">{name}</div>
        <div className="cabout">{about}</div>
        <RenderArr Comp={Project} arr={projects} label="Projects" />
      </div>
    );
  }
  return out;
}

export function Project(props) {
  let from = props.from;
  let fmtFrom = dtFmt("short", from);
  let name = props.name;
  let requirements = props.requirements;
  return (
    <KeyFragment>
      <div className="ProjectWrapper">
        <div className="ProjectLabelWrapper">
          <div className="ProjectName">{name}</div>
          <div className="ProjectDateWrapper">{fmtFrom}</div>
        </div>
        {RenderArr({ arr: requirements, Comp: Requirement, label: "Requirements" })}
      </div>
    </KeyFragment>
  );
}
*/
export function RenderArr(props) {
    let label = props.label;
    let Comp = props.Comp;
    let arr = props.arr;
    //let labelClass = props.labelClass ?? "clabel";
    let labelClass = props.labelClass ?? "RenderArrLabel";
    let wrapClass = props.wrapClass ?? "bpm";
    let arrClass = props.arrClass ?? "bpm2";
    let compClass = props.compClass ?? "crow";
    //console.log("In RA, TOC:", toComp);
    if (!arr || !Array.isArray(arr) || !arr.length) {
        return _jsx(Fragment, {});
    }
    let arrOut = _jsx(Fragment, {});
    try {
        if (Array.isArray(arr)) {
            let myArr = arr;
            //@ts-ignore
            arrOut = myArr.map((el, idx) => {
                return _jsx(Fragment, { children: Comp({ key: idx, ...el, className: compClass }) }, idx);
            });
        }
    }
    catch (e) {
        let stack = e.stack;
        let stackArr = stack.split("\n");
        let msg = e.message;
        console.error("Caught the error here:", { msg, stackArr });
    }
    return (_jsxs("div", { className: wrapClass, children: [_jsx("div", { className: labelClass, children: label }), _jsx("div", { className: arrClass, children: arrOut })] }));
}
//# sourceMappingURL=helpers.js.map