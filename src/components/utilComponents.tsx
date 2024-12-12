"use client";
/**
 * Experiment with general utility components built with StyleBuilder, etc
 */
// NPM Packages

// Local Packages
import {
  StyleBuilder, cxsb, csssb,
} from '../libs/styleUtils.js';

import {withStyled} from '../react-utils/index.js';

let h1Style = StyleBuilder.builder.fs('2rem').fw('bold').c('blue').br('1px solid red').p(1).ta().bg('#ddd').ff('a');
//export const H1 = withStyled(h1Style,'h1', );