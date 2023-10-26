import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import Select from 'react-select';
export function TstSelect() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    return (_jsx("div", { className: "App", children: _jsx(Select, { defaultValue: selectedOption, onChange: setSelectedOption, options: options }) }));
}
//# sourceMappingURL=formConponents.js.map