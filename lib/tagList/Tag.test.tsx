"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {getDefaultTagProps, getDefaultTagState, Tag} from "./index";

test("Test retrieval of Tag props object", () => {
	const props = getDefaultTagProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultTagState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a simple Tag instance", () => {
	const ctl = shallow(<Tag>test tag</Tag>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of the simple Tag instance", () => {
	const click = jest.fn();
	const ctl = mount(
		<Tag disabled onClick={click} usedelete>
			test tag
		</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
});

test("Test making Tag invisible", () => {
	const ctl = mount(
		<Tag disabled usedelete visible={false}>
			test tag
		</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test hiding/showing the delete button in Tag", () => {
	const tag: string = "test tag";
	const ondelete = jest.fn();
	const ctl = mount(
		<Tag onDelete={ondelete} usedelete>
			{tag}
		</Tag>
	);

	assert(ctl);
	ctl.find(".ui-tag")
		.first()
		.simulate("mouseOver");
	expect(ctl.state("showDelete")).toBe(true);
	ctl.find(".ui-button")
		.first()
		.simulate("click");
	expect(ondelete).toHaveBeenCalled();
	expect(ondelete).toHaveBeenCalledWith(tag);
});

test("Test the mouseout event to hide the Tag delete button", () => {
	const tag: string = "test tag";
	const ctl = mount(<Tag usedelete>{tag}</Tag>);

	assert(ctl);
	ctl.find(".ui-tag")
		.first()
		.simulate("mouseOver");
	assert(ctl.state("showDelete"));

	ctl.find(".ui-tag")
		.first()
		.simulate("mouseOut");
	assert(ctl.state("showDelete") === false);
});
