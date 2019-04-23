"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Location} from "../shared";
import {
	ButtonDialog,
	getDefaultButtonDialogProps,
	getDefaultButtonDialogState
} from "./index";

test("Test retrieval of ButtonDialog props object", () => {
	const props = getDefaultButtonDialogProps();
	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultButtonDialogState();
	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a ButtonDialog control", () => {
	const ctl = shallow(
		<ButtonDialog
			className='test-class'
			dialogClasses={["test-class-dialog"]}
		>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a ButtonDialog control on top", () => {
	const ctl = shallow(
		<ButtonDialog
			className='test-class'
			dialogClasses={["test-class-dialog"]}
			location={Location.top}
		>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of the ButtonDialog control", () => {
	const ctl = mount(
		<ButtonDialog disabled={true}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");

	assert(ctl.state("visible") === false);
});

test("Test making the ButtonDialog invisible", () => {
	const ctl = mount(
		<ButtonDialog visible={false}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");

	assert(ctl.state("visible") === false);
});

test("Test the click event on a ButtonDialog control", () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);

	assert(ctl.prop("iconName") === "bomb");
	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));
	assert(ctl.contains(<p>Dialog test</p>));

	ctl.find(".ui-button")
		.first()
		.simulate("click");

	assert(ctl.state("visible"));
});

test("Test opening the button dialog window", () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	assert(ctl);
	assert(ctl.contains(<p>Dialog test</p>));
	ctl.find(".ui-button")
		.first()
		.simulate("click");

	assert(ctl.state("visible"));
});
