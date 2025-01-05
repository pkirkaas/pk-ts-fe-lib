import { SDiv, mkStyled, } from './components/formComponents.js';

import {PopupDialog, RButton,
} from './index.js';
let FromStyled = mkStyled('div', {
  border: "solid green 3px",
  fontWeight: "bold",
  fontSize: "xx-large",
  color: 'blue',
  fontFamily:"courier"
});

export function Tst2() {
    const handleSave = (text: string) => {
    console.log('Saved text:', text)
  }

  const handleCancel = () => {
    console.log('Dialog cancelled')
  }
  return (
    <div style={{backgroundColor: "red", border: "solid 1px green", width:"100%"}}>
      <h1>Tst2</h1>
      <SDiv>Who Knows</SDiv>
      <FromStyled>I Know</FromStyled>
      <div className="outline min-h-10">
        Here and there
        <RButton>Test</RButton>
        <PopupDialog
          title="Test Popup"
          trigger={<button>Open Popup</button>}
          defaultText="Initial text"
          onSave={handleSave}
          onCancel={handleCancel}

        
        />
        </div>
    </div>
  );
}