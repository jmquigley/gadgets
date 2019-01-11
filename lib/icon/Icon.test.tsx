'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultIconProps, Icon} from '../../dist/bundle';

test('Test retrieval of the Icon props object', () => {
	const props = getDefaultIconProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of an Icon control with icon', () => {
	const ctl = shallow(
		<Icon
			className="test-class"
			iconName="star"
			style={{
				color: 'red',
				backgroundColor: 'blue'
			}}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of an Icon control with image', () => {
	const ctl = shallow(
		<Icon
			imageFile="./test-icon-image.png"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Icon control', () => {
	const ctl = mount(<Icon disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making the ButtonDialog invisible', () => {
	const ctl = mount(
		<Icon visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
