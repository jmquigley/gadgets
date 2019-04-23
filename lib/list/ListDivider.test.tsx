"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultListDividerProps,
	getDefaultListDividerState,
	ListDivider
} from "./index";

test("Test retrieval of ListHeader props object", () => {
	const props = getDefaultListDividerProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultListDividerState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test the creation of a ListDivider control", () => {
	const ctl = shallow(<ListDivider color='blue' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
