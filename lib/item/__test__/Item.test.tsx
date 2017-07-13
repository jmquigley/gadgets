'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultItemProps, Item} from '../index';

test('Test retrieval of Item props object', () => {
	const props = getDefaultItemProps();

	expect(props).toBeTruthy();
});

test('Test the creation of a Item control', () => {
	const ctl = mount(
		<Item
			title="test title"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('title')).toBe('test title');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
});

// TODO: test adding a right and left button, click
// TODO: create item disable test case
// TODO; create item visible test case
