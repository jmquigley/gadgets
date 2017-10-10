'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {getDefaultSwitchProps, Switch, SwitchType} from '../index';

test('Test retrieval of the Switch props object', () => {
	const props = getDefaultSwitchProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of an inny type Switch', () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.inny} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of an outy type Switch', () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.outy} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the Switch control', () => {
	const ctl = mount(<Switch disabled />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the Switch control invisible', () => {
	const ctl = mount(<Switch visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the click handler on the Switch control', () => {
	const click = sinon.spy();
	const ctl = shallow(<Switch onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert(!ctl.state('toggle'));

	const btn = ctl.find('.ui-switch-button');

	btn.simulate('click');
	assert(click.calledOnce);
	assert(click.calledWith(true));
	assert(ctl.state('toggle'));

	btn.simulate('click');
	assert(click.calledTwice);
	assert(click.calledWith(false));
	assert(!ctl.state('toggle'));
});
