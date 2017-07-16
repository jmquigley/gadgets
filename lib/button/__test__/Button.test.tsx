'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Button,	getDefaultButtonProps} from '../index';

test('Test retrieval of Button props object', () => {
	const props = getDefaultButtonProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Button control', () => {
	const ctl = shallow(<Button className="test-class"/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Button control with custom icon, colors, and border', () => {
	const ctl = shallow(
		<Button
			color="red"
			backgroundColor="black"
			borderColor="green"
			borderWidth="2px"
			iconName="superpowers"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Button', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a Button invisible', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test Button click event', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).toHaveBeenCalled();
});
