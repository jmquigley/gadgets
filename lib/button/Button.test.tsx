'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Button,	getDefaultButtonProps} from './index';

test('Test retrieval of Button props object', () => {
	const props = getDefaultButtonProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Button control', () => {
	const ctl = shallow(<Button className="test-class"/>);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Button control with custom icon, colors, and border', () => {
	const ctl = shallow(
		<Button
			iconName="superpowers"
			style={{
				backgroundColor: 'black',
				borderColor: 'green',
				borderWidth: '2px',
				color: 'red'
			}}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Button', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a Button invisible', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test Button click event', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).toHaveBeenCalled();
});
