"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Button} from "./Button";

test("Test creation of a Button control", () => {
	const ctl = shallow(<Button className='test-class' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a Button control with custom icon, colors, and border", () => {
	const ctl = shallow(
		<Button
			iconName='superpowers'
			style={{
				backgroundColor: "black",
				borderColor: "green",
				borderWidth: "2px",
				color: "red"
			}}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a Button", () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making a Button invisible", () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} hidden />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});

test("Test Button click event", () => {
	const click = jest.fn();
	const ctl = mount(<Button onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});
