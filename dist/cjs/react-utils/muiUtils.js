import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { StyleBuilder, } from '../libs/styleUtils.js';
import { css, } from '@emotion/react';
/**
 * Experiment w. HOC component builder - but don't think can build one atop another -
 * css is overwritten?
 */
export const withStyled = (styles, Base = 'div') => (props) => {
    let sb = new StyleBuilder(styles);
    let sbStyle = sb.style;
    return (_jsx(Base, { css: css(sbStyle), ...props }));
};
//# sourceMappingURL=muiUtils.js.map