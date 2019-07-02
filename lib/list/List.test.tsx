import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {waitPromise} from "util.wait";
import List from "./List";
import ListItem from "./ListItem";

test("Test the creation of a List control container", () => {
	const ctl = shallow(
		<List alternating className='test-class'>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a List control", () => {
	const ctl = shallow(
		<List disabled={true}>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making List control invisible", () => {
	const ctl = shallow(
		<List visible={false}>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test a list with ListItem and selection", () => {
	const ctl = mount(
		<List>
			<ListItem title='Item #1' />
			<ListItem title='Item #2' />
		</List>
	);

	assert(ctl);

	assert(ctl.prop("disabled") === false);
	assert(ctl.prop("visible"));
	assert(ctl.find(".ui-list").length === 3);

	const li1 = ctl.find(ListItem).first();
	assert(li1);

	const li2 = ctl.find(ListItem).last();
	assert(li2);

	assert(li1.text() === "Item #1");
	assert(li2.text() === "Item #2");
});

test("Test the onSelection handler within a list", async () => {
	const select = jest.fn();
	const ctl = mount(
		<List onSelection={select}>
			<ListItem title='Item #1' />
			<ListItem title='Item #2' />
		</List>
	);

	assert(ctl);
	ctl.find(".ui-listitem")
		.first()
		.find(".ui-label")
		.first()
		.simulate("click");

	// When the item is clicked it is not selected immediately.  There is a wait
	// handler within ListItem that attempts to detect double clicks.  This means
	// We must want N seconds before safely checking that the item was clicked
	// and that the onSelection callback was invoked.

	await waitPromise(2)
		.then(() => {
			expect(select).toHaveBeenCalled();
			expect(select).toHaveBeenCalledWith("Item #1");
		})
		.catch((err: string) => {
			expect(err).toBeNull();
		});
});
