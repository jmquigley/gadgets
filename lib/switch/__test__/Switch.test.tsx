'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultSwitchProps, Switch, SwitchType} from '../index';

test('Test retrieval of the Switch props object', () => {
	const props = getDefaultSwitchProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of an inny type Switch', () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.inny} />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of an outy type Switch', () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.outy} />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the Switch control', () => {
	const ctl = mount(<Switch disabled />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test making the Switch control invisible', () => {
	const ctl = mount(<Switch visible={false} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test the click handler on the Switch control', () => {
	const click = jest.fn();
	const ctl = shallow(<Switch onClick={click} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
	expect(ctl.state('toggle')).toBe(false);

	const btn = ctl.find('.ui-switch-button');

	btn.simulate('click');
	expect(click).toHaveBeenCalled();
	expect(click).toHaveBeenLastCalledWith(true);
	expect(ctl.state('toggle')).toBe(true);

	btn.simulate('click');
	expect(click).toHaveBeenCalledTimes(2);
	expect(click).toHaveBeenLastCalledWith(false);
	expect(ctl.state('toggle')).toBe(false);
});
