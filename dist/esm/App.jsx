/**
 * Tst App for pk fe testing
 */
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Responsive } from './components/index.js';
import { Tst1 } from './Tst1.js';
import { Tst2 } from './Tst2.js';
import { Tst3 } from './Tst3.js';
import { TailwindPlay } from './TailwindPlay.js';
import { BuildRoutes, RespNav, } from './react-utils/index.js';
//import styled  from 'styled-components';
import '../scss/pk-default.scss';
export const rNavVals = {
    about: { path: '/', label: "Tst1", component: Tst1, },
    gallery: { path: '/tst2', label: "Tst2", component: Tst2 },
    panels: { path: '/panels', label: "Panels", component: Tst3 },
    tailplay: { path: '/tailwindplay', label: "Tailwind Play", component: TailwindPlay },
};
function App(props) {
    //<div className='tsttw'>Testing Tailwind</div> (check if tailwind.css is loaded)
    // <h1 className="text-3xl font-bold underline text-center">
    return (<div id="app-id" {...props}>
      <Container fluid>
          <h1 className="tsth1">
    Hello world!
  </h1>
  <Responsive />
  <BrowserRouter>
  <>

  {RespNav(rNavVals)}
  <div className=" p-16 border border-blue-200 bg-red-100 ">

    {BuildRoutes(rNavVals)}
  </div>
  </>
  </BrowserRouter>
  </Container>
  </div>);
}
export default App;
//# sourceMappingURL=App.jsx.map