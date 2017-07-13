'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {Location, Sizing} from '../../shared';
import {Badge, getDefaultBadgeProps} from '../index';

test('Test retrieval of Badge props object', () => {
	const props = getDefaultBadgeProps();

	expect('counter' in props).toBe(true);
	expect(props.counter).toBe(0);

	expect('location' in props).toBe(true);
	expect(props.location).toBe(Location.topRight);

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);

	expect('suppress' in props).toBe(true);
	expect(props.suppress).toBe(false);
});

test('Test creation of a Badge control', () => {
	const ctl = mount(
		<Badge
			backgroundColor="blue"
			className="test-class"
			color="red"
			suppress
			counter={-1}
		>
			Test Component
		</Badge>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('backgroundColor')).toBe('blue');
	expect(ctl.prop('color')).toBe('red');
	expect(ctl.prop('counter')).toBe(-1);
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('suppress')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.find('.ui-badge').length).toBe(0);
});

test('Test clicking a Badge counter control', () => {
	const click = sinon.spy();
	const ctl = mount(
		<Badge
			counter={1}
			onClick={click}
		>
			Test Component
		</Badge>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-badge').simulate('click');
	expect(click.calledOnce).toBe(true);
});

// TODO: disabling the badge control
// TODO: make the badge invisible
