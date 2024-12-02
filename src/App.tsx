import { useState } from 'react'
import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js'
import {Tst1} from './Tst1.js';
import {Tst2} from './Tst2.js';
import {NavVals} from './react-utils/index.js';
//import styled  from 'styled-components';
import { styled }  from 'styled-components';
import { PanelSeparator, TstSelect,  VPanelGroup, HPanelGroup, } from './components/formComponents.js';
import { SDiv, mkStyled, } from './components/formComponents.js';
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";
import '../scss/pk-default.scss';
import {
  typeOf, GenObj,
} from 'pk-ts-common-lib';

let OromStyled = mkStyled(SDiv, {
  border: "solid black 3px",
  fontWeight: "bold",
  fontSize: "xx-large",
  color: 'red',
  background: "#ddd",

});
let FromStyled = mkStyled('div', {
  border: "solid green 3px",
  fontWeight: "bold",
  fontSize: "xx-large",
  color: 'blue',
  fontFamily:"courier"
});


let ModStyled2 = styled(FromStyled).attrs<GenObj>(props => ({
  $background: props.$background || "yellow",
  $fontsize: props.$fontsize || "xx-large",
  $color: props.$color || "green",
  //@ts-ignore
}))({
  border: "solid green 5px",
  backgroundColor: props => props.$background,
  fontSize: props => props.$fontsize,
  color: props => props.$color,
  fontWeight: "bold",
});

  
function App() {
  const [count, setCount] = useState(0)
    let csshRef = getCssHrefs();
  let jsshRef = getJsHrefs();
  let intId = startAvailableChecks();
  /*
  return (<div>Empty App</div>);
  */

  return (
    <div className="App fullw">
      <SDiv>Who Knows</SDiv>
<FromStyled>I Know</FromStyled>
<OromStyled>Abstracted</OromStyled>
      <ModStyled2 $background="#aaf" $color="orange" style={{ width: 400 }}>Super Abstracted</ModStyled2>
      <h1 className="gb">Vite + React</h1>
      <div>Testing Func Params</div>

      <div className="brdr">
        <p> Testing components</p>
        <VPanelGroup>
          <Panel className="brnm" minSize={25}>
            <h1>First Panel</h1>
          </Panel>
          <PanelSeparator />
          <Panel className="brnm" minSize={25}>
            <h1>Second Panel</h1>
            </Panel>

        </VPanelGroup>
        
      </div>

      <div>END Testing Func Params</div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
