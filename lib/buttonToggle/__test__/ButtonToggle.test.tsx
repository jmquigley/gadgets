'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonToggle, getDefaultButtonToggleProps} from '../index';

test('Test retrieval of ButtonToggle props object', () => {
	const props = getDefaultButtonToggleProps();

	assert(props);
	expect(props).toMatchSnapshot();
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

test('Test disabling of a ButtonToggle', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(!click.calledOnce);
});

test('Test making a ButtonToggle invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonToggle onClick={click} visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(!click.calledOnce);
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

	assert(ctl);
	assert(btn);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconNameOn'), 'star');
	assert.equal(ctl.prop('iconNameOff'), 'star-o');

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	assert(!btn.state.toggle);
	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(click.calledOnce);
	assert(click.calledWith(true));
	assert(btn.state.toggle);
	assert.equal(btn.state.toggle, ctl.state('toggle'));
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

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.prop('iconName'), 'bomb');
	assert.equal(ctl.prop('iconNameOn'), 'star');
	assert.equal(ctl.prop('iconNameOff'), 'star-o');

	assert(!ctl.state('toggle'));
	ctl.find('.ui-button-toggle').first().simulate('click');
	assert(click.calledOnce);
	assert(click.calledWith(true));
	assert(ctl.state('toggle'));
});
