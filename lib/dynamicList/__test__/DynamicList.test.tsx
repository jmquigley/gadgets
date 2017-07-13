'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {DynamicList, getDefaultDynamicListProps} from '../index';

test('Test retrieval of DynamicList props object', () => {
	const props = getDefaultDynamicListProps();

	expect(props);

	expect('title' in props).toBe(true);
	expect(props.title).toBe('');
});

test('Test creation of a DynamicList control', () => {
	const ctl = mount(<DynamicList className="test-class" />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.test-class').length).toBe(1);
});

// TODO: test case for validating props object creator
// TODO: disabling the DynamicList
// TODO: make the DynamicList invisible
