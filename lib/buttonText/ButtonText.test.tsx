'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {ButtonText, getDefaultButtonTextProps, Justify} from '../../dist/bundle';

test('Test retrieval of ButtonText props object', () => {
	const props = getDefaultButtonTextProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a ButtonText control to the left', () => {
	const ctl = mount(
		<ButtonText
			className="test-class"
			justify={Justify.left}
			style={{
				color: 'white',
				borderColor: 'green',
				backgroundColor: 'blue'
			}}
			text="test text"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a ButtonText control', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonText onClick={click} disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-text').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonText control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonText onClick={click} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-text').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
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

	expect(ctl).toBeDefined();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('text')).toBe('test text');

	ctl.find('.ui-button-text').first().simulate('click');
	expect(click).toHaveBeenCalled();
});
