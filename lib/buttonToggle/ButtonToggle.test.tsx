'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {ButtonToggle, getDefaultButtonToggleProps} from './index';

test('Test retrieval of ButtonToggle props object', () => {
	const props = getDefaultButtonToggleProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a ButtonToggle control', () => {
	const ctl = shallow(<ButtonToggle className="test-class"/>);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a ButtonToggle control with on/off icons', () => {
	const ctl = mount(
		<ButtonToggle
			iconNameOn="star"
			iconNameOff="star-o"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a ButtonToggle', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonToggle invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test ButtonToggle click event', () => {
	const click = jest.fn();
	const ctl = mount(
		<ButtonToggle
			iconNameOn="star"
			iconNameOff="star-o"
			onClick={click}
		/>);
	const btn = ctl.instance() as ButtonToggle;

	expect(ctl).toBeDefined();
	expect(btn).toBeDefined();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconNameOn')).toBe('star');
	expect(ctl.prop('iconNameOff')).toBe('star-o');

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(btn.state.toggle).toBe(false);
	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).toHaveBeenCalled();
	expect(click).toHaveBeenCalledWith(true);

	expect(btn.state.toggle).toBe(true);
	expect(btn.state.toggle).toBe(ctl.state('toggle'));
});

test('Test the icon switch in a ButtonToggle click', () => {
	const click = jest.fn();
	const ctl = mount(
		<ButtonToggle
			iconNameOff="star-o"
			iconNameOn="star"
			onClick={click}
		/>
	);

	expect(ctl).toBeDefined();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('iconNameOn')).toBe('star');
	expect(ctl.prop('iconNameOff')).toBe('star-o');

	expect(ctl.state('toggle')).toBe(false);
	ctl.find('.ui-button-toggle').first().simulate('click');

	expect(click).toHaveBeenCalled();
	expect(click).toHaveBeenCalledWith(true);
	expect(ctl.state('toggle')).toBe(true);
});
