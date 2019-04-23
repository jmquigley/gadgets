"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Badge, getDefaultBadgeProps, getDefaultBadgeState} from "./index";

test("Test retrieval of Badge props object", () => {
	const props = getDefaultBadgeProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultBadgeState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a Badge control", () => {
	const ctl = shallow(
		<Badge
			className='test-class'
			counter={1}
			style={{
				backgroundColor: "blue",
				color: "red"
			}}
			suppress
		>
			Test Component
		</Badge>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of a Badge control", () => {
	const ctl = shallow(<Badge disabled />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the Badge control invisible", () => {
	const ctl = shallow(<Badge visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test clicking a Badge counter control", () => {
	const click = jest.fn();
	const ctl = mount(
		<Badge counter={1} onClick={click}>
			Test Component
		</Badge>
	);

	assert(ctl);
	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));

	ctl.find(".ui-badge")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});
