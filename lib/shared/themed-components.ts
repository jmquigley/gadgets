'use strict';

import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import {ThemeProps} from './themes';

export type StyledFunction<T> = styledComponents.ThemedStyledFunction<T, ThemeProps>;

function withProps<T, U extends HTMLElement = HTMLElement>(
	styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
	return styledFunction;
}

const {
	default: styled,
	css,
	injectGlobal,
	keyframes,
	withTheme,
	ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<any> as ThemedStyledComponentsModule<ThemeProps>;

export {
	css,
	injectGlobal,
	keyframes,
	withProps,
	withTheme,
	ThemeProvider
};

export default styled;
