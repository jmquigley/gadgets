'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Badge, getDefaultBadgeProps} from '../index';

test('Test retrieval of Badge props object', () => {
	const props = getDefaultBadgeProps();

	assert(props);
	expect(props).toMatchSnapshot();
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

test('Test the disabling of a Badge control', () => {
	const ctl = shallow(<Badge disabled />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the Badge control invisible', () => {
	const ctl = shallow(<Badge visible={false} />);

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
