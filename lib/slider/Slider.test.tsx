"use strict";

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {getDefaultSliderProps, getDefaultSliderState, Slider} from "./index";

test("Test retrieval of Slider props object", () => {
	const props = getDefaultSliderProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultSliderState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a simple Slider control", () => {
	const ctl = mount(
		<Slider min={1} max={50} scale={2} snap startPosition={0} ticks={5} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling a Slider control", () => {
	const ctl = mount(<Slider disabled scale={2} snap ticks={5} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test with bad min/max values", () => {
	const ctl = mount(<Slider max={0} min={-1} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const slider = ctl.instance() as Slider;
	assert(slider);

	assert(slider.min === 0);
	assert(slider.max === 1);
});

// TODO: add test cases for mousedown, mousemove, mouseup
