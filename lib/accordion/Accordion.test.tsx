const debug = require("debug")("gadgets.test.Accordion");

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	Accordion,
	getDefaultAccordionProps,
	getDefaultAccordionState
} from "./index";

test("Test retrieval of Accordion props object", () => {
	const props = getDefaultAccordionProps();
	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultAccordionState();
	assert(state);
	expect(state).toMatchSnapshot();

	debug("props: %O, state: %O", props, state);
});

test("Test the creation of a Accordion control container", () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion id='1234' className='test-class'>
			{li}
		</Accordion>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of the Accordion control container", () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion className='test-class' disabled id='1234'>
			{li}
		</Accordion>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the accordion control invisible", () => {
	const li = <li>some list item</li>;
	const ctl = shallow(
		<Accordion className='test-class' id='1234' visible={false}>
			{li}
		</Accordion>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
