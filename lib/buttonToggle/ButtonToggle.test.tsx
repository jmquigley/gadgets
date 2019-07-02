"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {ButtonToggle} from "./ButtonToggle";

test("Test creation of a ButtonToggle control", () => {
	const ctl = shallow(<ButtonToggle className='test-class' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a ButtonToggle control with on/off icons", () => {
	const ctl = mount(<ButtonToggle iconNameOn='star' iconNameOff='star-o' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a ButtonToggle", () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making a ButtonToggle invisible", () => {
	const click = jest.fn();
	const ctl = mount(<ButtonToggle onClick={click} hidden />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});

test("Test ButtonToggle click event", () => {
	const click = jest.fn();
	const toggle = jest.fn();

	const ctl = mount(
		<ButtonToggle
			iconNameOn='star'
			iconNameOff='star-o'
			onClick={click}
			onToggle={toggle}
		/>
	);
	const btn = ctl.instance() as ButtonToggle;

	assert(btn);
	assert(ctl);

	assert(ctl.prop("iconName") === "bomb");
	assert(ctl.prop("iconNameOn") === "star");
	assert(ctl.prop("iconNameOff") === "star-o");

	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));

	assert(btn.state.toggle === false);
	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
	expect(toggle).toHaveBeenCalled();
	expect(toggle).toHaveBeenCalledWith(true);

	assert(btn.state.toggle);
	assert(btn.state.toggle === ctl.state("toggle"));
});

test("Test the icon switch in a ButtonToggle click", () => {
	const click = jest.fn();
	const toggle = jest.fn();

	const ctl = mount(
		<ButtonToggle
			iconNameOff='star-o'
			iconNameOn='star'
			onClick={click}
			onToggle={toggle}
		/>
	);

	assert(ctl);

	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));
	assert(ctl.prop("iconName") === "bomb");
	assert(ctl.prop("iconNameOn") === "star");
	assert(ctl.prop("iconNameOff") === "star-o");

	assert(ctl.state("toggle") === false);
	ctl.find(".ui-button-toggle")
		.first()
		.simulate("click");

	expect(click).toHaveBeenCalled();
	expect(toggle).toHaveBeenCalled();
	expect(toggle).toHaveBeenCalledWith(true);

	assert(ctl.state("toggle"));
});
