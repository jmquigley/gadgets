"use strict";

import {Color, ColorScheme} from "../colors";
import defaultTheme from "./default";
import {BaseThemeProps} from "./index";

const theme: BaseThemeProps = {
	...defaultTheme,
	backgroundColor: Color.black,
	borderColor: ColorScheme.c1,
	chevronColor: Color.lightgray,
	color: Color.white,
	headerForegroundColor: Color.white,
	headerBackgroundColor: ColorScheme.c1,
	headerHoverColor: ColorScheme.c4,
	hoverColor: "#ffe11a",
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	outlineColor: Color.glow,
	searchFocus: Color.glow,
	searchMatch: ColorScheme.c5,
	selectedBackgroundColor: ColorScheme.c1,
	selectedForegroundColor: Color.white,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.gray,
	tooltipForegroundColor: Color.white,
	transitionDelay: "0.33s"
};

export default theme;
