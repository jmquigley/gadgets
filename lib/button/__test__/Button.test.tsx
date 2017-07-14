'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {Sizing} from '../../shared';
import {Button, getDefaultButtonProps} from '../index';

test('Test retrieval of Button props object', () => {
	const props = getDefaultButtonProps();

	expect(props).toBeTruthy();

	expect('iconName' in props).toBe(true);
	expect(props.iconName).toBe('bomb');

	expect('iconStyle' in props).toBe(true);
	expect(props.iconStyle).toBe('');

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);
});

test('Test creation of a Button control', () => {
	const ctl = mount(<Button className="test-class"/>);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.ui-button').length).toBe(1);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-bomb').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
});

test('Test creation of a Button control with custom icon, colors, and border', () => {
	const ctl = mount(
		<Button
			color="red"
			backgroundColor="black"
			borderColor="green"
			borderWidth="2px"
			iconName="superpowers"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('superpowers');
	expect(ctl.prop('color')).toBe('red');
	expect(ctl.prop('backgroundColor')).toBe('black');
	expect(ctl.prop('borderColor')).toBe('green');
	expect(ctl.prop('borderWidth')).toBe('2px');

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.ui-button').length).toBe(1);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-superpowers').length).toBe(1);
});

test('Test Button click event', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('i').simulate('click');
	expect(click.calledOnce).toBe(true);
});

test('Test disabling of a Button', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('i').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});

test('Test making a Button invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} visible={false} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);

	ctl.find('i').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});
