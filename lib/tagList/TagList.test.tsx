"use strict";

import {mount, shallow} from "enzyme";
import {List} from "immutable";
import assert from "power-assert";
import * as React from "react";
import {getDefaultTagListProps, getDefaultTagListState, TagList} from "./index";

test("Test retrieval of TagList props object", () => {
	const props = getDefaultTagListProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultTagListState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a simple TagList instance", () => {
	const ctl = shallow(<TagList />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Create a new static TagList with 3 tags (a, b, c)", () => {
	const ctl = mount(<TagList tags={["a", "b", "c"]} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["a", "b", "c"]));
});

test("Create a new static TagList with 3 tags (c, b, a) with no sorting", () => {
	const ctl = mount(<TagList nosort tags={["c", "b", "a"]} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["c", "b", "a"]));
});

test("Create a new dynamic TagList by adding a new input", () => {
	const keypress = jest.fn();
	const onnew = jest.fn();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={["c", "b", "d"]}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find("input");
	expect(input).toBeDefined();

	let tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["b", "c", "d"]));
	input.simulate("keyPress", {key: "Enter", target: {value: "a"}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalledWith("a");

	tags = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(
		expect.arrayContaining(["a", "b", "c", "d"])
	);
});

test("Try to create a duplicate entry within a dynamic TagList", () => {
	const keypress = jest.fn();
	const onnew = jest.fn();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={["c", "b", "d"]}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find("input");
	expect(input).toBeDefined();

	let tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["b", "c", "d"]));
	input.simulate("keyPress", {key: "Enter", target: {value: "d"}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).not.toHaveBeenCalled();

	tags = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["b", "c", "d"]));
});

test("Create a new dynamic TagList item and cancel creation with escape", () => {
	const keydown = jest.fn();
	const ctl = mount(
		<TagList onKeyDown={keydown} tags={["a", "b", "c"]} useinput />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find("input");
	expect(input).toBeDefined();

	let tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();

	expect(tags.toArray()).toEqual(expect.arrayContaining(["a", "b", "c"]));
	input.simulate("keyDown", {key: "Escape"});
	expect(keydown).toHaveBeenCalled();

	tags = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["a", "b", "c"]));
});

test("Remove a tag from a TagList", () => {
	const ondelete = jest.fn();
	const ctl = mount(
		<TagList onDelete={ondelete} tags={["a", "b", "c"]} useinput />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	let tags: List<string> = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["a", "b", "c"]));

	const btns = ctl.find(".ui-button");

	// show the delete button that will be clicked
	ctl.find(".ui-tag")
		.at(0)
		.simulate("mouseOver");
	btns.at(0).simulate("click");

	expect(ondelete).toHaveBeenCalled();
	expect(ondelete).toHaveBeenCalledWith("a");

	tags = ctl.state("tags");
	expect(tags).toBeDefined();
	expect(tags.toArray()).toEqual(expect.arrayContaining(["b", "c"]));
});
