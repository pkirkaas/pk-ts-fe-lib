import { useState } from 'react'
import { startAvailableChecks, getLoadedCss, getCssHrefs, getJsHrefs } from './libs/browserTweaks.js'
import { PanelSeparator, TstSelect, TstArgs1, TstArgs2, VPanelGroup, HPanelGroup, } from './components/formComponents.jsx';
import { Panel, PanelGroup, PanelResizeHandle, PanelGroupProps,  } from "react-resizable-panels";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Reset-Css-2023.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
    let csshRef = getCssHrefs();
  let jsshRef = getJsHrefs();
  let intId = startAvailableChecks();

  return (
    <div className="App">
      <div>
          { /*
        <a href="https://vitejs.dev" target="_blank">
          <img src="./vite.svg" className="logo" alt="Vite logo" />
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="./react.svg" className="logo react" alt="React logo" />
          { /*
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <TstSelect    />
  */ }
      </div>
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      diT</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
