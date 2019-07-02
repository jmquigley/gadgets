"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {waitPromise} from "util.wait";
import {Button} from "../button/Button";
import ListItem from "./ListItem";

function validate(ctl: any) {
	assert(ctl);
	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));
	assert(ctl.find(".ui-listitem").length === 10);
}

test("Test the creation of a ListItem control with simple title", () => {
	const ctl = shallow(<ListItem title='test title' selected />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of a ListItem control with left & right title", () => {
	const ctl = shallow(
		<ListItem title='test title left' widget='test title right' />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a ListItem control", () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem disabled={true} onClick={click} title='test title' />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-item")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making ListItem control invisible", () => {
	const click = jest.fn();
	const ctl = mount(<ListItem title='test title' visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-item")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test clicking of the left button on the ListItem control", () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title='test title'
			leftButton={<Button iconName='bath' onClick={click} />}
		/>
	);

	validate(ctl);

	assert(ctl.prop("title") === "test title");
	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();

	assert(ctl.find(".fa").length === 3);
	assert(ctl.find(".fa-bath").length === 3);
});

test("Test clicking of the right button on the ListItem control", () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title='test title'
			rightButton={<Button iconName='bath' onClick={click} />}
		/>
	);

	validate(ctl);

	assert(ctl.prop("title") === "test title");
	ctl.find(".ui-button")
		.last()
		.simulate("click");
	expect(click).toHaveBeenCalled();

	assert(ctl.find(".fa").length === 3);
	assert(ctl.find(".fa-bath").length === 3);
});

test("Test clicking of the title bar area of the ListItem", async () => {
	const click = jest.fn();
	const ctl = mount(<ListItem title='test title' onClick={click} />);

	validate(ctl);

	assert(ctl.prop("title") === "test title");
	ctl.find(".ui-label")
		.first()
		.simulate("click");

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			expect(click).toHaveBeenCalled();
		})
		.catch((err: string) => {
			throw new Error(err);
		});
});

test("Test double click of the title bar area of the ListItem", () => {
	const click = jest.fn();
	const ctl = mount(<ListItem title='test title' onClick={click} />);
	const listItem = ctl.instance() as ListItem;

	validate(ctl);
	assert(listItem);

	const titleCtl = ctl.find(".ui-label").first();
	assert(titleCtl);

	assert(listItem.preventClick === false);
	assert(ctl.prop("title") === "test title");
	titleCtl.simulate("doubleClick");
	assert(listItem.preventClick);
	assert(ctl.state("toggleRipple"));

	// The single click should be ignored because the double
	// click was used.
	expect(click).not.toHaveBeenCalled();

	// After the double click, simulate leaving focus and reseting
	// the control.
	titleCtl.simulate("blur");
	assert(listItem.preventClick === false);
	assert(ctl.state("toggleRipple") === false);
});
