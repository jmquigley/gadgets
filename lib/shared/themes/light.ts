'use strict';

import {Color, ColorScheme} from '../props';
import {ThemeProps} from './index';

const theme: ThemeProps = {
	backgroundColor: Color.white,
	borderColor: '#004358',
	color: Color.black,
	headerForegroundColor: Color.white,
	headerBackgroundColor: '#004358',
	headerHoverColor: '#ffe11a',
	hoverColor: '#ffe11a',
	inputBorderColor: Color.silver,
	itemHoverColor: ColorScheme.c3,
	selectedBackgroundColor: '#004358',
	selectedForegroundColor: Color.white,
	titleBarBackgroundColor: ColorScheme.c1,
	titleBarForegroundColor: ColorScheme.c4,
	tooltipBackgroundColor: Color.gray,
	tooltipForegroundColor: Color.white,
	transitionDelay: '0.5s'
};

export default theme;
