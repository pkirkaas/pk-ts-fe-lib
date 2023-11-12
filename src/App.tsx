import { useState } from 'react'
import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js'
import styled  from 'styled-components';
import { PanelSeparator, TstSelect,  VPanelGroup, HPanelGroup, } from './components/formComponents.js';
import {
  SDiv,
  mkStyled,
} from './components/formComponents.js';
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Reset-Css-2023.css'
import './App.css';
import './tst.scss';
import {
  typeOf,
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
});

//@ts-ignore
//let ModStyled = FromStyled().css({ color: "green", background: "orange" });
//let ModStyled = styled(FromStyled).css({ color: "green", background: "orange" });
let ModStyled = styled(FromStyled).attrs({ aborder:"solid black 5px", theWidth:"450px", style: { color: "green", background: "orange", padding: "20px" } })
  `font-weight: bold; color: red; font-style: italic; width: ${props => props.theWidth};  border: ${props => props['aborder']} `;
  //({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props) => props.theWidth,  border: (props) => props['aborder'] });
  //({ fontWeight: "bold", color: "red", fontStyle: "italic", width: (props => props.theWidth) ,  border: (props => props['aborder']) });
  //({ fontWeight: "bold", color: "red", fontStyle: "italic", border: props['aborder'] });
  
  
 // `font-weight:bold; color:red; font-style:italic;`;

//let ModStyled = styled.div.attrs({ color: "green", background: "orange" })`font-weight:bold;`;

//export { default as appCss } from  './App.css';
//export { default as resetCss } from './Reset-Css-2023.css'
function App() {
  const [count, setCount] = useState(0)
    let csshRef = getCssHrefs();
  let jsshRef = getJsHrefs();
  let intId = startAvailableChecks();

  return (
    <div className="App">
      <SDiv>Who Knows</SDiv>
<FromStyled>I Know</FromStyled>
<OromStyled>Abstracted</OromStyled>
<ModStyled>Super Abstracted</ModStyled>
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
