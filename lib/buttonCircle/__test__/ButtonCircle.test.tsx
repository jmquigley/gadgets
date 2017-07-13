'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonCircle, getDefaultButtonCircleProps} from '../index';

test('Test retrieval of ButtonCircle props object', () => {
	const props = getDefaultButtonCircleProps();

	expect(props).toBeTruthy();

	expect('iconName' in props).toBe(true);
	expect(props.iconName).toBe('bomb');
});

test('Test creation of a ButtonCircle control', () => {
	const ctl = mount(<ButtonCircle className="test-class" />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.find('.ui-button-circle').length).toBe(1);
});

test('Test ButtonCircle click event', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-button').simulate('click');
	expect(click.calledOnce).toBe(true);
});

test('Test disabling of a ButtonCircle control', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-button').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});

test('Test making a ButtonCircle control invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} visible={false} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);

	ctl.find('.ui-button').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});
