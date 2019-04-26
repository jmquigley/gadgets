"use strict";

import {Color, ColorScheme} from "../props";
import defaultTheme from "./default";
import {ThemeProps} from "./index";

const theme: ThemeProps = {
	...defaultTheme,
	backgroundColor: Color.black,
	borderColor: ColorScheme.c1,
	chevronColor: Color.gray,
	color: Color.white,
	headerForegroundColor: Color.white,
	headerBackgroundColor: ColorScheme.c1,
	headerHoverColor: ColorScheme.c4,
	hoverColor: "#ffe11a",
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	selectedBackgroundColor: ColorScheme.c1,
	selectedForegroundColor: Color.white,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.gray,
	tooltipForegroundColor: Color.white,
	transitionDelay: "0.5s"
};

export default theme;
