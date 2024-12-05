// Testing resize comps
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";

import { StyleBuilder, withStyled, H1 } from './index.js';

import { SDiv, mkStyled,
  PanelSeparator, TstSelect,  VPanelGroup, HPanelGroup, ResizeHandle,


 } from './components/index.js';
export function Tst3() {
  return (
    <div style={{backgroundColor: "#fee", border: "solid 1px green", width:"100%"}}>
      <H1>Tst3</H1>

      <SDiv>Who Knows</SDiv>
      <H1>Start of HPanel Group</H1>
      <HPanelGroup minSize={300} style={{ border: "solid 1px green", width:"100%"}}>
        <Panel defaultSize={30} style={{  background: 'red', minHeight:"30px" }}>
        <div>An HPanelItem</div>
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={30} style={{  background: 'green', minHeight:"30px" }}>
        <div>Another HPanel Item</div>
        </Panel>
      </HPanelGroup>
      {/*
      <H1>Start of VPanel Group</H1>
      <VPanelGroup>
      </VPanelGroup>
      */}
    </div>
  );
}