
import { StyleBuilder, withStyled, H1 } from './index.js';

import { SDiv, mkStyled, } from './components/formComponents.js';
export function Tst3() {
  return (
    <div style={{backgroundColor: "red", border: "solid 1px green", width:"100%"}}>
      <H1>Tst3</H1>
      <SDiv>Who Knows</SDiv>
      <H1>I Know</H1>
    </div>
  );
}