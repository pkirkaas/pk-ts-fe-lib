import { useState } from 'react'
import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks'
import { PanelSeparator, TstSelect,  VPanelGroup, HPanelGroup, } from './components/formComponents';
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Reset-Css-2023.css'
import './App.css';

//export { default as appCss } from  './App.css';
//export { default as resetCss } from './Reset-Css-2023.css'
function App() {
  const [count, setCount] = useState(0)
    let csshRef = getCssHrefs();
  let jsshRef = getJsHrefs();
  let intId = startAvailableChecks();

  return (
    <div className="App">
      <h1>Vite + React</h1>
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
