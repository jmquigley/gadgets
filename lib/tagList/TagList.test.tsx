import {mount, shallow} from "enzyme";
import {List} from "immutable";
import assert from "power-assert";
import * as React from "react";
import TagList from "./TagList";

test("Test creation of a simple TagList instance", () => {
	const ctl = shallow(<TagList />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Create a new static TagList with 3 tags (a, b, c)", () => {
	const ctl = mount(<TagList tags={["a", "b", "c"]} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Create a new static TagList with 3 tags (c, b, a) with no sorting", () => {
	const ctl = mount(<TagList nosort tags={["c", "b", "a"]} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
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

	input.simulate("keyPress", {key: "Enter", target: {value: "a"}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalledWith("a", ["a", "b", "c", "d"]);
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

	input.simulate("keyPress", {key: "Enter", target: {value: "d"}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).not.toHaveBeenCalled();
});

test("Create a new dynamic TagList item and cancel creation with escape", () => {
	const keydown = jest.fn();
	const onnew = jest.fn();
	const ctl = mount(
		<TagList
			onKeyDown={keydown}
			onNew={onnew}
			tags={["a", "b", "c"]}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find("input");
	expect(input).toBeDefined();

	input.simulate("keyDown", {key: "Escape"});
	expect(keydown).toHaveBeenCalled();
	expect(onnew).not.toHaveBeenCalled();
});

test("Remove a tag from a TagList", () => {
	const ondelete = jest.fn();
	const ctl = mount(
		<TagList onDelete={ondelete} tags={"a, b, c"} useinput />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const btns = ctl.find(".ui-button");

	// show the delete button that will be clicked
	ctl.find(".ui-tag")
		.at(0)
		.simulate("mouseOver");
	btns.at(0).simulate("click");

	expect(ondelete).toHaveBeenCalled();
	expect(ondelete).toHaveBeenCalledWith("a", ["b", "c"]);
});
