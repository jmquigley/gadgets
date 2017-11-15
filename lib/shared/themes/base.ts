'use strict';

import {Color, ColorScheme} from '../props';
import {ThemeProps} from './index';

const theme: ThemeProps = {
	backgroundColor: Color.white,
	borderColor: Color.silver,
	color: Color.black,
	headerForegroundColor: Color.white,
	headerBackgroundColor: ColorScheme.c1,
	headerHoverColor: ColorScheme.c4,
	hoverColor: Color.silver,
	inputBorderColor: Color.silver,
	tooltipBackgroundColor: 'gray',
	tooltipForegroundColor: 'white',
	transitionDelay: '0.5s'
};

export default theme;
