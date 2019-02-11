"use strict";

import {mount} from "enzyme";
import * as React from "react";
import {getDefaultSliderProps, Slider} from "./index";

test("Test retrieval of Slider props object", () => {
	const props = getDefaultSliderProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test("Test creation of a simple Slider control", () => {
	const ctl = mount(
		<Slider min={1} max={50} scale={2} snap startPosition={0} ticks={5} />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test("Test disabling a Slider control", () => {
	const ctl = mount(<Slider disabled scale={2} snap ticks={5} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test("Test with bad min/max values", () => {
	const ctl = mount(<Slider max={0} min={-1} />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	const slider = ctl.instance() as Slider;
	expect(slider).toBeTruthy();

	expect(slider.min).toBe(0);
	expect(slider.max).toBe(1);
});

// TODO: add test cases for mousedown, mousemove, mouseup
