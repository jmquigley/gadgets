/**
 * Handles management of themes within the gadgets library.  It contains two
 * methods: `setTheme` and `getTheme`.  By default the library is initialized
 * with the *base* theme.  A theme represents an object with key/value pairs
 * that can be used within a styled component.  The theme object is passed
 * to a styled component with the `ThemeProvider` [wrapper](https://www.styled-components.com/docs/advanced#theming)
 *
 * It contains the following themes:
 *
 * - base - the basic color scheme for the gadgets library
 * - custom - a user defined theme.  It is empty unless the user created one
 * during the `setTheme` call.
 * - dark
 * - light
 *
 * See the './lib/shared/themes/base.json' for the keys that should be used
 * within a custom object implementation.
 *
 * #### Examples:
 *
 * ```javascript
 * import {getTheme, setTheme, Theme} from 'gadgets';
 *
 * setTheme(Theme.dark);
 *
 * ...
 *
 * render(
 *     <ThemeProvider theme={getTheme()}>
 *         ...
 *     </ThemeProvider>
 * );
 * ```
 *
 * @module themes
 */

import {default as base} from './base';
import {default as dark} from './dark';
import {default as light} from './light';

export interface ThemeProps {
	backgroundColor: string;
	borderColor: string;
	color: string;
	headerForegroundColor: string;
	headerBackgroundColor: string;
	headerHoverColor: string;
	hoverColor: string;
	inputBorderColor: string;
	tooltipBackgroundColor: string;
	tooltipForegroundColor: string;
	transitionDelay: string;
}

export enum Theme {
	base,
	custom,
	dark,
	light
}

interface Themes {
	[key: string]: ThemeProps;
}

const themes: Themes = {
	[Theme.base]: base,
	[Theme.dark]: dark,
	[Theme.light]: light,
	[Theme.custom]: base
};

let currentTheme: Theme = Theme.base;

/**
 * Retrieves the object representing the requested theme.
 * @param theme {Theme} a reference to the name of the theme that should be
 * selected and set within this module.
 * @return {ThemeProps} the key/value object that contains CSS settings
 */
export function getTheme(theme: Theme = currentTheme) {
	if (theme in Theme) {
		return themes[theme];
	} else {
		return base;
	}
}

/**
 * @return {string[]} an array of strings that represent the names of all
 * themes that are available.
 */
export function getThemeList(): string[] {
	return Object.keys(Theme)
		.map(key => Theme[key])
		.filter(it => typeof it === 'string')
		.sort();
}

/**
 * Sets the current internal theme to the requested name (if it exists)
 * If the requested theme doesn't exist, then the `base` theme is set.
 * @param custom {Object} a custom theme object
 * @param theme {Theme} a reference to the name of the theme that should be
 * selected and set within this module.
 * @return {ThemeProps} a reference to the current theme object
 */
export function setTheme(custom: ThemeProps, theme: Theme = Theme.custom) {
	themes[Theme.custom] = custom;

	if (theme in Theme) {
		currentTheme = theme;
	} else {
		currentTheme = Theme.base;
	}

	return getTheme();
}
