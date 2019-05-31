"use strict";

import {EnumValues as ev} from "enum-values";
import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Sizing} from "../shared";
import {
	getDefaultOptionProps,
	getDefaultOptionState,
	Option,
	OptionType
} from "./index";

test("Test retrieval of Option props object", () => {
	const props = getDefaultOptionProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultOptionState();

	assert(state);
	expect(state).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the Option control (${sizing})`, () => {
		const ctl = shallow(
			<Option
				className='test-class'
				sizing={Sizing[sizing]}
				text='test'
			/>
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}

for (const optionType of ev.getNames(OptionType)) {
	test(`Creation of the Option control (${optionType})`, () => {
		const ctl = shallow(
			<Option
				className='test-class'
				optionType={OptionType[optionType]}
				text='test'
			/>
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}

test("Test disabling of the Option control", () => {
	const click = jest.fn();
	const ctl = mount(<Option onSelection={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making the Option control invisible", () => {
	const click = jest.fn();
	const ctl = mount(<Option onSelection={click} visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test Option control click event", () => {
	const click = jest.fn();
	const ctl = mount(<Option onSelection={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-option")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
	assert(click.mock.calls[0][0]);
});
