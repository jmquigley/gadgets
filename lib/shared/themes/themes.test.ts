'use strict';

const debug = require('debug')('themes.test');

import {getTheme, getThemeList, setTheme, Theme, ThemeProps} from './index';

test('Test retrieval of the current theme', () => {
	const theme = getTheme();

	expect(theme).toBeDefined();
	expect(theme).toMatchSnapshot();
});

test('Test retrieving the dark theme', () => {
	const theme = getTheme(Theme.dark);

	expect(theme).toBeDefined();
	expect(theme).toMatchSnapshot();
});

test('Test retrieving the light theme', () => {
	const theme = getTheme(Theme.light);

	expect(theme).toBeDefined();
	expect(theme).toMatchSnapshot();
});

test('Test setting and retrieving a custom theme', () => {
	const base = getTheme(Theme.base);

	const props: ThemeProps = Object.assign({color: 'red'}, base);
	expect(props).toBeDefined();

	const theme: ThemeProps = setTheme(props);
	expect(theme).toBeDefined();
	expect(theme).toMatchSnapshot();

	const customTheme = getTheme(Theme.custom);
	expect(theme).toBe(customTheme);
});

test('Test retrieving a bad theme (doesn\'t exist)', () => {
	const theme = getTheme(null);
	expect(theme).toBeDefined();
	expect(theme).toMatchSnapshot();

	const baseTheme = getTheme(Theme.base);
	expect(baseTheme).toBeDefined();
	expect(theme).toBe(baseTheme);
});

test('Test setting a bad theme', () => {
	const theme = setTheme(null, null);
	expect(theme).toBeDefined();

	const baseTheme = getTheme(Theme.base);
	expect(baseTheme).toBeDefined();
	expect(theme).toBe(baseTheme);
});

test('Test retrieving the list of available themes', () => {
	const themeList: string[] = getThemeList();

	expect(themeList).toBeDefined();
	debug(themeList);
	expect(themeList).toEqual(['base', 'custom', 'dark', 'light']);
});
