// Testing resize comps
//import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,} from "react-resizable-panels";

import { StyleBuilder, withStyled, } from './index.js';

import { SDiv, mkStyled, Panel,
      VPanelGroup, HPanelGroup, ResizeHandle,


 } from './components/index.js';
export function Tst3() {
  return (
    <div style={{backgroundColor: "#fee", border: "solid 1px green", width:"100%"}}>
      <h1>Tst3</h1>

      <SDiv>Who Knows</SDiv>
      <h1>Start of HPanel Group</h1>
      <HPanelGroup style={{ border: "solid 1px green", width:"100%"}}>
        <Panel defaultSize={30} style={{  background: 'red', minHeight:"30px" }}>
        <div style={{border: "solid red 3px"}}>An HPanelItem</div>
        </Panel>
        <Panel defaultSize={30} style={{  background: 'green', minHeight:"30px" }}>
        <div>Another HPanel Item</div>
        </Panel>
        <Panel>
          <div style={{background:"#EFE"}}>Third HPanel Item</div>
        </Panel>
      </HPanelGroup>
      <h1>Start of VPanel Group</h1>  
      <VPanelGroup style={{minHeight:"200px", border: "solid 1px green", width:"100%"}}>
        <Panel style={{   background: 'red',}}>
          <div style={{background:"#EFE"}}>First V Panel Item</div>
        </Panel>
        <Panel defaultSize={100} style={{  minHeight:"100px",  background: 'green', }}>
          <div style={{background:"#EEF"}}>Second V Panel Item</div>
        </Panel>
      </VPanelGroup>
      {/*
      <h1>Start of VPanel Group</H1>
      <VPanelGroup>
      </VPanelGroup>
      */}
    </div>
  );
}