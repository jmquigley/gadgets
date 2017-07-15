'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {ButtonToggle, getDefaultButtonToggleProps} from '../index';

test('Test retrieval of ButtonToggle props object', () => {
	const props = getDefaultButtonToggleProps();

	assert(props);

	assert('bgColorOff' in props);
	assert.equal(props.bgColorOff, 'inherit');

	assert('bgColorOn' in props);
	assert.equal(props.bgColorOn, 'inherit');

	assert('fgColorOff' in props);
	assert.equal(props.fgColorOff, 'gray');

	assert('fgColorOn' in props);
	assert.equal(props.fgColorOn, 'black');

	assert('initialToggle' in props);
	assert.equal(props.initialToggle, false);

	assert('iconNameOff' in props);
	assert.equal(props.iconNameOff, 'bomb');

	assert('iconNameOn' in props);
	assert.equal(props.iconNameOn, 'bomb');
});

test('Test creation of a ButtonToggle control', () => {
	const ctl = shallow(<ButtonToggle className="test-class"/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a ButtonToggle control with on/off icons', () => {
	const ctl = mount(
		<ButtonToggle
			iconNameOn="star"
			iconNameOff="star-o"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
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

	assert(ctl);
	assert(btn);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconNameOn'), 'star');
	assert.equal(ctl.prop('iconNameOff'), 'star-o');

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	assert(!btn.state.toggle);
	ctl.find('.ui-button-toggle').simulate('click');
	expect(click).toHaveBeenCalled();
	assert(btn.state.toggle);
	assert.equal(btn.state.toggle, ctl.state('toggle'));
});

test('Test disabling of a ButtonToggle', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.disabled').length, 1);

	ctl.find('.ui-button-toggle').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonToggle invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} visible={false} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.invisible').length, 1);

	ctl.find('.ui-button-toggle').simulate('click');
	expect(click).not.toHaveBeenCalled();
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

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconNameOn'), 'star');
	assert.equal(ctl.prop('iconNameOff'), 'star-o');

	assert(!ctl.state('toggle'));
	ctl.find('.ui-button-toggle').simulate('click');
	expect(click).toHaveBeenCalled();
	assert(ctl.state('toggle'));
});
