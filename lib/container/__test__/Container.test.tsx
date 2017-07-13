'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Container, getDefaultContainerProps} from '../index';

test('Test retrieval of Container props object', () => {
	const props = getDefaultContainerProps();

	expect(props).toBeTruthy();

	expect('children' in props).toBe(true);
	expect(props.children).toBeNull();
});

test('Test creation of a Container control', () => {
	const ctl = mount(
		<Container>
			<p>Test Container</p>
		</Container>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.find('.ui-container').length).toBe(1);
	expect(ctl.contains(<p>Test Container</p>)).toBe(true);
});

test('Test creation of a Container control with an id value', () => {
	const ctl = mount(
		<Container id="testid">
			<p>Test Container</p>
		</Container>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.find('.ui-container').length).toBe(1);
	expect(ctl.prop('id')).toBe('testid');
	expect(ctl.contains(<p>Test Container</p>)).toBe(true);
});
