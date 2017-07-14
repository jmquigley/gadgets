'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Direction, Sizing} from '../../shared';
import {getDefaultTriangleProps, Triangle} from '../index';

test('Test retrieval of Triangle props object', () => {
	const props = getDefaultTriangleProps();

	expect(props).toBeTruthy();

	expect('backgroundColor' in props).toBe(true);
	expect(props.backgroundColor).toBe('inherit');

	expect('borderColor' in props).toBe(true);
	expect(props.borderColor).toBe('inherit');

	expect('borderWidth' in props).toBe(true);
	expect(props.borderWidth).toBe('2px');

	expect('direction' in props).toBe(true);
	expect(props.direction).toBe(Direction.up);

	expect('nobase' in props).toBe(true);
	expect(props.nobase).toBe(false);

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);
});

test('Test creation of a Triangle control', () => {
	const ctl = mount(<Triangle className="test-class" />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.test-class').length).toBe(1);
});

// TODO: create a Triangle with different color properties
// TODO: create a Triangle test for each direction
