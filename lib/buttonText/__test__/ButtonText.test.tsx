'use strict';

import * as assert from 'assert';
import {mount} from 'enzyme';
import * as React from 'react';
import {ButtonText, getDefaultButtonTextProps} from '../index';

test('Test retrieval of ButtonText props object', () => {
	const props = getDefaultButtonTextProps();

	assert(props);

	assert('iconName' in props);
	assert.equal(props.iconName, 'bomb');

	assert('justify' in props);
	assert.equal(props.justify, ButtonText.RIGHT);

	assert('text' in props);
	assert.equal(props.text, '');
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

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test button click in ButtonText control', () => {
	const click = jest.fn();
	const ctl = mount(
		<ButtonText
			className="test-class"
			text="test text"
			onClick={click}
		/>
	);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.prop('text'), 'test text');

	const btn = ctl.find('.ui-button-text');
	assert.equal(btn.length, 1);
	btn.simulate('click');
	expect(click).toHaveBeenCalled();
});

test('Test disabling of a ButtonText control', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonText onClick={click} disabled={true} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	ctl.find('.ui-button-text').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonText control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonText onClick={click} visible={false} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));

	ctl.find('.ui-button-text').simulate('click');
	expect(click).not.toHaveBeenCalled();
});
