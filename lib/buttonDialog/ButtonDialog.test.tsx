"use strict";

import {mount, shallow} from "enzyme";
import * as React from "react";
import {Location} from "../shared";
import {ButtonDialog, getDefaultButtonDialogProps} from "./index";

test("Test retrieval of ButtonDialog props object", () => {
	const props = getDefaultButtonDialogProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
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

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of the ButtonDialog control", () => {
	const ctl = mount(
		<ButtonDialog disabled={true}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(ctl.state("visible")).toBe(false);
});

test("Test making the ButtonDialog invisible", () => {
	const ctl = mount(
		<ButtonDialog visible={false}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(ctl.state("visible")).toBe(false);
});

test("Test the click event on a ButtonDialog control", () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeDefined();

	expect(ctl.prop("iconName")).toBe("bomb");
	expect(ctl.prop("disabled")).toBe(false);
	expect(ctl.prop("visible")).toBe(true);
	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(ctl.state("visible")).toBe(true);
});

test("Test opening the button dialog window", () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeDefined();

	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);
	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(ctl.state("visible")).toBe(true);
});
