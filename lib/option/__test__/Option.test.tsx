'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultOptionProps, Option, OptionType} from '../index';

test('Test retrieval of Option props object', () => {
	const props = getDefaultOptionProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Creation of the Option control', () => {
	const ctl = shallow(
		<Option
			className="test-class"
			optionType={OptionType.square}
			selected
			text="test"
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the Option control', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} disabled={true} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making the Option control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} visible={false} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test Option control click event', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-option').first().simulate('click');
	expect(click).toHaveBeenCalled();
	expect(click.mock.calls[0][0]).toBe(true);
});
