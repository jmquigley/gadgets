'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonToggle, getDefaultButtonToggleProps} from '../index';

test('Test retrieval of ButtonToggle props object', () => {
	const props = getDefaultButtonToggleProps();

	expect(props).toBeTruthy();

	expect('bgColorOff' in props).toBe(true);
	expect(props.bgColorOff).toBe('inherit');

	expect('bgColorOn' in props).toBe(true);
	expect(props.bgColorOn).toBe('inherit');

	expect('fgColorOff' in props).toBe(true);
	expect(props.fgColorOff).toBe('gray');

	expect('fgColorOn' in props).toBe(true);
	expect(props.fgColorOn).toBe('black');

	expect('initialToggle' in props).toBe(true);
	expect(props.initialToggle).toBe(false);

	expect('iconNameOff' in props).toBe(true);
	expect(props.iconNameOff).toBe('bomb');

	expect('iconNameOn' in props).toBe(true);
	expect(props.iconNameOn).toBe('bomb');
});

test('Test creation of a ButtonToggle control', () => {
	const ctl = mount(<ButtonToggle className="test-class"/>);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.ui-button-toggle').length).toBe(1);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-bomb').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
});

test('Test creation of a ButtonToggle control with on/off icons', () => {
	const ctl = mount(
		<ButtonToggle
			iconNameOn="star"
			iconNameOff="star-o"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconNameOn')).toBe('star');
	expect(ctl.prop('iconNameOff')).toBe('star-o');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.ui-button-toggle').length).toBe(1);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-star-o').length).toBe(1);
});

test('Test ButtonToggle click event', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ButtonToggle
			iconNameOn="star"
			iconNameOff="star-o"
			onClick={click}
		/>);
	const btn = ctl.instance() as ButtonToggle;

	expect(ctl).toBeTruthy();
	expect(btn).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconNameOn')).toBe('star');
	expect(ctl.prop('iconNameOff')).toBe('star-o');

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(btn.state.toggle).toBe(false);
	ctl.find('.ui-button-toggle').simulate('click');
	expect(click.calledOnce).toBe(true);
	expect(btn.state.toggle).toBe(true);

	expect(btn.state.toggle).toBe(ctl.state('toggle'));
});

test('Test disabling of a ButtonToggle', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-button-toggle').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});

test('Test making a ButtonToggle invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonToggle onClick={click} visible={false} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);

	ctl.find('.ui-button-toggle').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});

test('Test the icon switch in a ButtonToggle click', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ButtonToggle
			iconNameOff="star-o"
			iconNameOn="star"
			onClick={click}
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconNameOn')).toBe('star');
	expect(ctl.prop('iconNameOff')).toBe('star-o');

	expect(ctl.state('toggle')).toBe(false);
	ctl.find('.ui-button-toggle').simulate('click');
	expect(click.calledOnce).toBe(true);
	expect(ctl.state('toggle')).toBe(true);
});
