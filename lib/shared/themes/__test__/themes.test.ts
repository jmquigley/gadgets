'use strict';

const debug = require('debug')('themes.test');

import * as assert from 'assert';
import {default as base} from '../base';
import {getTheme, getThemeList, setTheme, Theme, ThemeProps} from '../index';

test('Test retrieval of the current theme', () => {
	const theme = getTheme();

	assert(theme);
	expect(theme).toMatchSnapshot();
});

test('Test retrieving the dark theme', () => {
	const theme = getTheme(Theme.dark);

	assert(theme);
	expect(theme).toMatchSnapshot();
});

test('Test retrieving the light theme', () => {
	const theme = getTheme(Theme.light);

	assert(theme);
	expect(theme).toMatchSnapshot();
});

test('Test setting and retrieving a custom theme', () => {
	const props: ThemeProps = Object.assign({color: 'red'}, base);
	assert(props);

	const theme: ThemeProps = setTheme(props);
	assert(theme);
	expect(theme).toMatchSnapshot();

	const customTheme = getTheme(Theme.custom);
	assert(theme === customTheme);
});

test('Test retrieving a bad theme (doesn\'t exist)', () => {
	const theme = getTheme(null);
	assert(theme);
	expect(theme).toMatchSnapshot();

	const baseTheme = getTheme(Theme.base);
	assert(baseTheme);
	assert(theme === baseTheme);
});

test('Test setting a bad theme', () => {
	const theme = setTheme(null, null);
	assert(theme);

	const baseTheme = getTheme(Theme.base);
	assert(baseTheme);
	assert(theme === baseTheme);
});

test('Test retrieving the list of available themes', () => {
	const themeList: string[] = getThemeList();

	assert(themeList);
	debug(themeList);
	assert.deepEqual(themeList, ['base', 'custom', 'dark', 'light']);
});
