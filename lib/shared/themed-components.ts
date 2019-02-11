"use strict";

import * as styledComponents from "styled-components";
import {ThemedStyledComponentsModule} from "styled-components";

import {ThemeProps} from "./themes";

const {
	default: styled,
	css,
	createGlobalStyle,
	keyframes,
	withTheme,
	ThemeProvider
} = (styledComponents as ThemedStyledComponentsModule<
	any
>) as ThemedStyledComponentsModule<ThemeProps>;

export {css, createGlobalStyle, keyframes, withTheme, ThemeProvider};

export default styled;
