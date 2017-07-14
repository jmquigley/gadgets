'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {Button, getDefaultButtonProps} from '../index';

test('Test retrieval of Button props object', () => {
	const props = getDefaultButtonProps();

	assert(props);

	assert('iconName' in props);
	assert.equal(props.iconName, 'bomb');

	assert('iconStyle' in props);
	assert.equal(props.iconStyle, '');

	assert('sizing' in props);
	assert.equal(props.sizing, Sizing.normal);
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

test('Test Button click event', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	ctl.find('.ui-button').simulate('click');
	expect(click).toHaveBeenCalled();
});

test('Test disabling of a Button', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	assert(ctl);

	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.disabled').length, 1);

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a Button invisible', () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} visible={false} />);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.invisible').length, 1);

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});
