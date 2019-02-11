"use strict";

// const debug = require('debug')('Pager.test');

import {mount, shallow} from "enzyme";
import * as React from "react";
import {waitPromise} from "util.wait";
import {getDefaultPagerProps, Pager} from "./index";

function validate(ctl: any) {
	expect(ctl).toBeDefined();
	expect(ctl.prop("disabled")).toBe(false);
	expect(ctl.prop("visible")).toBe(true);
}

test("Test retrieval of Pager props object", () => {
	const props = getDefaultPagerProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test("Test creation of a Pager control", () => {
	const ctl = shallow(<Pager className='test-class' />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test pager getPages method with front of list", () => {
	const ctl = mount(<Pager totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([1, 2, 3]));
	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test pager getPages method with 2nd to last in list", () => {
	const ctl = mount(<Pager initialPage={11} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([10, 11, 12]));
	expect(pager.currentPage).toBe(11);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test Pager getPages method with last in the List", () => {
	const ctl = mount(<Pager initialPage={12} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([10, 11, 12]));
	expect(pager.currentPage).toBe(12);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test Pager getPages method with invalid initial page (negative test)", () => {
	const ctl = mount(<Pager initialPage={-1} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([1, 2, 3]));
	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test Pager getPages method with invalid pageSizes (negative test)", () => {
	const ctl = mount(<Pager pageSizes={null} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([1, 2, 3]));
	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(ctl.state("pageSize")).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test Pager getPages method with empty pageSizes (negative test)", () => {
	const ctl = mount(<Pager pageSizes={[]} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([1, 2, 3]));
	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test Pager getPages method with invalid totalItems (negative test)", () => {
	const ctl = mount(<Pager pageSizes={[]} totalItems={0} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.pages).toEqual(expect.arrayContaining([1, 0, 0]));
	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(1);
	expect(pager.state.pageSize).toBe(25);
	expect(pager.state.pageSize).toBe(pager.pageSize);
});

test("Test selection of the second page in the control", () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager onSelect={select} pageSizes={[10, 25, 100]} totalItems={3000} />
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	// Click the second page number.  Can't click the first one because
	// it is already selected by default when the control is created
	ctl.find(".ui-button-text")
		.at(4)
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select.mock.calls[0][0]).toBe(2);
});

test('Test pressing the "<<" (first) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager initialPage={2} onSelect={select} totalItems={299} />
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.currentPage).toBe(2);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);

	// Select the first button "<<" move from 2 -> 1
	ctl.find(".ui-button")
		.at(0)
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select.mock.calls[0][0]).toBe(1);
});

test('Test pressing the "<" (previous) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager initialPage={3} onSelect={select} totalItems={299} />
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.currentPage).toBe(3);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);

	// Select the first button "<" move from 3 -> 2
	ctl.find(".ui-button")
		.at(3)
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select.mock.calls[0][0]).toBe(2);
});

test('Test pressing the ">" (next) button', () => {
	const select = jest.fn();
	const ctl = mount(<Pager onSelect={select} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);

	// Select the third button ">", move from 1 -> 2
	ctl.find(".ui-button")
		.at(6)
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select.mock.calls[0][0]).toBe(2);
});

test('Test pressing the ">>" (last) button', () => {
	const select = jest.fn();
	const ctl = mount(<Pager onSelect={select} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();

	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);

	// Select the fourth button ">>", move from 1 -> 12
	ctl.find(".ui-button")
		.at(10)
		.simulate("click");
	expect(select).toHaveBeenCalled();
	expect(select.mock.calls[0][0]).toBe(12);
});

test('Test selecting dialog "50" to change the page size', async () => {
	const select = jest.fn();
	const ctl = mount(<Pager onSelect={select} totalItems={299} />);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	expect(pager).toBeDefined();
	expect(pager.dialog).toBeDefined();

	expect(pager.currentPage).toBe(1);
	expect(pager.lastPage).toBe(12);
	expect(pager.state.pageSize).toBe(25);

	// Select the "50" from the dialog list, click and check page size
	// Goes from 25 -> 50
	ctl.find(".ui-title")
		.at(30)
		.simulate("click");

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			expect(select).toHaveBeenCalled();
			expect(select.mock.calls[0][0]).toBe(1);

			expect(pager.currentPage).toBe(1);
			expect(pager.lastPage).toBe(12);
			expect(pager.state.pageSize).toBe(25);
		})
		.catch((err: string) => {
			expect(err).toBeNull();
		});
});

test("Repeatedly create instance with different initial start for props test", () => {
	for (let i = 1; i < 5; i++) {
		const ctl = mount(<Pager initialPage={i} totalItems={299} />);

		validate(ctl);
		const pager = ctl.instance() as Pager;
		expect(pager).toBeDefined();
		expect(pager.currentPage).toBe(i);
	}
});

// TODO: add a test to show changing page size but resetting current to 1
// TODO: add a test to show changing page size keeps current page
// TODO: add test case for TextInput in Pager
// TODO: add test for Pager blur, change, keyPress
// TODO: add test to show pressing the sort dialog buttons
