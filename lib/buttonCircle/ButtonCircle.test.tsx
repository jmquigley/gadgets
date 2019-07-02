"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {ButtonCircle} from "./ButtonCircle";

test("Test creation of a ButtonCircle control", () => {
	const ctl = shallow(<ButtonCircle className='test-class' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a ButtonCircle control", () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making a ButtonCircle control invisible", () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} hidden />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});

test("Test ButtonCircle click event", () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
});
