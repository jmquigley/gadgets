"use strict";

import {Color, ColorScheme} from "../props";
import {ThemeProps} from "./index";

const theme: ThemeProps = {
	backgroundColor: Color.white,
	borderColor: Color.silver,
	buttonColor: Color.gray,
	chevronColor: Color.gray,
	color: Color.black,
	fontFamily: "OpenSans, Georgia, serif",
	headerForegroundColor: Color.white,
	headerBackgroundColor: ColorScheme.c1,
	headerHoverColor: ColorScheme.c4,
	hoverColor: Color.silver,
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	outlineColor: Color.glow,
	searchFocus: Color.glow,
	searchMatch: ColorScheme.c5,
	selectedBackgroundColor: ColorScheme.c2,
	selectedForegroundColor: ColorScheme.c4,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.slategray,
	tooltipForegroundColor: Color.white,
	transitionDelay: "0.33s"
};

export default theme;
