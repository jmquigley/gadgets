'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultListDividerProps, ListDivider} from '../index';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListDividerProps();

	expect(props).toBeTruthy();

	expect('color' in props).toBe(true);
	expect(props.color).toBe('lightgray');
});

test('Test the creation of a ListDivider control', () => {
	const ctl = mount(
		<ListDivider color="blue" />
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('color')).toBe('blue');
	expect(ctl.find('.ui-list-divider').length).toBe(1);
});
