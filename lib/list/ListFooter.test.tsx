"use strict";

// const debug = require('debug')('ListFooter.test');

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultListFooterProps,
	getDefaultListFooterState,
	ListFooter
} from "./index";

test("Test retrieval of ListFooter props object", () => {
	const props = getDefaultListFooterProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultListFooterState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test the creation of a ListFooter control with simple title", () => {
	const ctl = mount(<ListFooter title='test title' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the ListFooter item
// TODO: make the ListFooter item invisible
