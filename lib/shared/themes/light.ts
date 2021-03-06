"use strict";

import {Color, ColorScheme} from "../colors";
import defaultTheme from "./default";
import {BaseThemeProps} from "./index";

const theme: BaseThemeProps = {
	...defaultTheme,
	backgroundColor: Color.white,
	borderColor: "#004358",
	chevronColor: Color.lightgray,
	color: Color.black,
	headerForegroundColor: Color.white,
	headerBackgroundColor: "#004358",
	headerHoverColor: "#ffe11a",
	hoverColor: "#ffe11a",
	inputBorderColor: Color.silver,
	itemAlternatingColor: Color.ultralightgray,
	itemHoverColor: ColorScheme.c3,
	outlineColor: Color.glow,
	searchFocus: Color.glow,
	searchMatch: ColorScheme.c5,
	selectedBackgroundColor: "#004358",
	selectedForegroundColor: Color.white,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.gray,
	tooltipForegroundColor: Color.white,
	transitionDelay: "0.33s"
};

export default theme;
