'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultListFooterProps, ListFooter} from '../index';

test('Test retrieval of ListFooter props object', () => {
	const props = getDefaultListFooterProps();

	expect(props).toBeTruthy();
});

test('Test the creation of a ListFooter control with simple title', () => {
	const ctl = mount(
		<ListFooter
			title="test title"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('title')).toBe('test title');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-list-footer').length).toBe(1);
});

// TODO: test case for validating props object creator
// TODO: disabling the ListFooter item
// TODO: make the ListFooter item invisible
