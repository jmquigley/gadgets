'use strict';

import {EnumValues as ev} from 'enum-values';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../shared';
import {
	getDefaultOptionProps,
	Option,
	OptionType
} from './index';

test('Test retrieval of Option props object', () => {
	const props = getDefaultOptionProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the Option control (${sizing})`, () => {
		const ctl = shallow(
			<Option
				className="test-class"
				sizing={Sizing[sizing]}
				text="test"
			/>
		);

		expect(ctl).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}

for (const optionType of ev.getNames(OptionType)) {
	test(`Creation of the Option control (${optionType})`, () => {
		const ctl = shallow(
			<Option
				className="test-class"
				optionType={OptionType[optionType]}
				text="test"
			/>
		);

		expect(ctl).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}

test('Test disabling of the Option control', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making the Option control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button-toggle').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test Option control click event', () => {
	const click = jest.fn();
	const ctl = mount(<Option onClick={click} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-option').first().simulate('click');
	expect(click).toHaveBeenCalled();
	expect(click.mock.calls[0][0]).toBe(true);
});
