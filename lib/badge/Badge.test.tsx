'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Badge, getDefaultBadgeProps} from '../../dist/bundle';

test('Test retrieval of Badge props object', () => {
	const props = getDefaultBadgeProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Badge control', () => {
	const ctl = shallow(
		<Badge
			className="test-class"
			counter={1}
			style={{
				backgroundColor: 'blue',
				color: 'red'
			}}
			suppress
		>
			Test Component
		</Badge>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of a Badge control', () => {
	const ctl = shallow(<Badge disabled />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test making the Badge control invisible', () => {
	const ctl = shallow(<Badge visible={false} />);

	expect(ctl).toBeTruthy();
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

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-badge').first().simulate('click');
	expect(click).toHaveBeenCalled();
});
