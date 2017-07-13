'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultListHeaderProps, ListHeader} from '../index';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListHeaderProps();

	expect(props).toBeTruthy();
});

test('Test the creation of a ListHeader control with simple title', () => {
	const ctl = mount(
		<ListHeader
			title="test title"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('title')).toBe('test title');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-list-header').length).toBe(1);
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
