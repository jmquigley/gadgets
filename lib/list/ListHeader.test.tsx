"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultListHeaderProps,
	getDefaultListHeaderState,
	ListHeader
} from "./index";

test("Test retrieval of ListHeader props object", () => {
	const props = getDefaultListHeaderProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultListHeaderState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test the creation of a ListHeader control with simple title", () => {
	const ctl = shallow(<ListHeader title='test title' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
