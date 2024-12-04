import { SDiv, mkStyled, } from './components/formComponents.js';
import { StyleBuilder, withStyled, H1 } from './index.js';
let FromStyled = mkStyled('div', {
  border: "solid green 3px",
  fontWeight: "bold",
  fontSize: "xx-large",
  color: 'blue',
  fontFamily:"courier"
});

export function Tst2() {
  return (
    <div style={{backgroundColor: "red", border: "solid 1px green", width:"100%"}}>
      <H1>Tst2</H1>
      <SDiv>Who Knows</SDiv>
      <FromStyled>I Know</FromStyled>
    </div>
  );
}