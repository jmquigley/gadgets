'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonText, getDefaultButtonTextProps} from '../index';

test('Test retrieval of ButtonText props object', () => {
	const props = getDefaultButtonTextProps();

	expect(props).toBeTruthy();

	expect('iconName' in props).toBe(true);
	expect(props.iconName).toBe('bomb');

	expect('justify' in props).toBe(true);
	expect(props.justify).toBe(ButtonText.RIGHT);

	expect('text' in props).toBe(true);
	expect(props.text).toBe('');
});

test('Test creation of a ButtonText control to the left', () => {
	const ctl = mount(
		<ButtonText
			className="test-class"
			text="test text"
			justify={ButtonText.LEFT}
			color="white"
			borderColor="green"
			backgroundColor="blue"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('text')).toBe('test text');
	expect(ctl.prop('justify')).toBe(ButtonText.LEFT);
	expect(ctl.prop('color')).toBe('white');
	expect(ctl.prop('backgroundColor')).toBe('blue');
	expect(ctl.prop('borderColor')).toBe('green');

	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.find('.ui-button-text').length).toBe(1);
});

test('Test button click in ButtonText control', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ButtonText
			className="test-class"
			text="test text"
			onClick={click}
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('text')).toBe('test text');

	const btn = ctl.find('.ui-button-text');
	expect(btn.length).toBe(1);
	btn.simulate('click');
	expect(click.calledOnce).toBe(true);
});

test('Test disabling of a ButtonText control', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonText onClick={click} disabled={true} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-button-text').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});

test('Test making a ButtonText control invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<ButtonText onClick={click} visible={false} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);

	ctl.find('.ui-button-text').simulate('click');
	expect(click.neverCalledWith()).toBe(true);
});
