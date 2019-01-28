'use strict';

import {Color, ColorScheme} from '../props';
import defaultTheme from './default';
import {ThemeProps} from './index';

const theme: ThemeProps = {...defaultTheme,
	backgroundColor: Color.white,
	borderColor: Color.silver,
	color: Color.black,
	headerForegroundColor: Color.white,
	headerBackgroundColor: ColorScheme.c1,
	headerHoverColor: ColorScheme.c4,
	hoverColor: Color.silver,
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	selectedBackgroundColor: ColorScheme.c2,
	selectedForegroundColor: ColorScheme.c4,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.slategray,
	tooltipForegroundColor: Color.white,
	transitionDelay: '0.5s'
};

export default theme;
