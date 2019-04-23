"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultSwitchProps,
	getDefaultSwitchState,
	Switch,
	SwitchType
} from "./index";

test("Test retrieval of the Switch props object", () => {
	const props = getDefaultSwitchProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultSwitchState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of an inny type Switch", () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.inny} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of an outy type Switch", () => {
	const ctl = shallow(
		<Switch initialToggle={true} switchType={SwitchType.outy} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of the Switch control", () => {
	const ctl = mount(<Switch disabled />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the Switch control invisible", () => {
	const ctl = mount(<Switch visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the click handler on the Switch control", () => {
	const click = jest.fn();
	const ctl = shallow(<Switch onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert(ctl.state("toggle") === false);

	const btn = ctl.find(".ui-switch-button");
	assert(btn);

	btn.simulate("click");
	expect(click).toHaveBeenCalled();
	expect(click).toHaveBeenLastCalledWith(true);
	assert(ctl.state("toggle"));

	btn.simulate("click");
	expect(click).toHaveBeenCalledTimes(2);
	expect(click).toHaveBeenLastCalledWith(false);
	assert(ctl.state("toggle") === false);
});
