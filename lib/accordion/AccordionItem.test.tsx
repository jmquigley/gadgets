"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	AccordionItem,
	getDefaultAccordionItemProps,
	getDefaultAccordionItemState
} from "./index";

test("Test retrieval of AccordionItem props object", () => {
	const props = getDefaultAccordionItemProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultAccordionItemState();
	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test the creation of a AccordionItem control", () => {
	const ctl = shallow(
		<AccordionItem className='test-class' title='Test Title' />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of the AccordionItem", () => {
	const ctl = shallow(<AccordionItem disabled title='Test Title' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the AccordionItem invisible", () => {
	const ctl = shallow(<AccordionItem title='Test Title' visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test clicking of the AccordionItem header", () => {
	const click = jest.fn();
	const child = <div>child content</div>;
	const ctl = mount(
		<AccordionItem initialToggle={false} onClick={click} title='Test Title'>
			{child}
		</AccordionItem>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert(ctl.state("toggle") === false);
	assert(ctl.contains(child) === false);
	ctl.find(".ui-label")
		.first()
		.simulate("click");
	expect(click).toHaveBeenCalled();
	assert(ctl.state("toggle") === true);
	assert(ctl.contains(child) === true);
});

test("Test clicking the AccordionItem header when setting nocollapse", () => {
	const click = jest.fn();
	const child = <div>child content</div>;
	const ctl = mount(
		<AccordionItem
			initialToggle={false}
			nocollapse
			onClick={click}
			title='Test Title'
		>
			{child}
		</AccordionItem>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert(ctl.state("toggle") === false);
	assert(ctl.contains(child) === false);
	ctl.find(".ui-label")
		.first()
		.simulate("click");
	expect(click).not.toHaveBeenCalled();
	assert(ctl.state("toggle") === false);
	assert(ctl.contains(child) === false);
});
