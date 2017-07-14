'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Location, Sizing} from '../../shared';
import {Badge, getDefaultBadgeProps} from '../index';

test('Test retrieval of Badge props object', () => {
	const props = getDefaultBadgeProps();

	assert(props);

	assert('counter' in props);
	assert.equal(props.counter, 0);

	assert('location' in props);
	assert.equal(props.location, Location.topRight);

	assert('sizing' in props);
	assert.equal(props.sizing, Sizing.normal);

	assert('suppress' in props);
	assert(!props.suppress);
});

test('Test creation of a Badge control', () => {
	const ctl = shallow(
		<Badge
			backgroundColor="blue"
			className="test-class"
			color="red"
			suppress
			counter={1}
		>
			Test Component
		</Badge>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test clicking a Badge counter control', () => {
	const click = jest.fn();
	const ctl = mount(
		<Badge
			counter={1}
			onClick={click}
		>
			Test Component
		</Badge>
	);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	ctl.find('.ui-badge').simulate('click');
	expect(click).toHaveBeenCalled();
});

// TODO: disabling the badge control
// TODO: make the badge invisible
