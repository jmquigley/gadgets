"use strict";

import {Color, ColorScheme} from "../props";
import defaultTheme from "./default";
import {ThemeProps} from "./index";

const theme: ThemeProps = {
	...defaultTheme,
	backgroundColor: Color.white,
	borderColor: "#004358",
	chevronColor: Color.gray,
	color: Color.black,
	headerForegroundColor: Color.white,
	headerBackgroundColor: "#004358",
	headerHoverColor: "#ffe11a",
	hoverColor: "#ffe11a",
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	selectedBackgroundColor: "#004358",
	selectedForegroundColor: Color.white,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.gray,
	tooltipForegroundColor: Color.white,
	transitionDelay: "0.5s"
};

export default theme;
