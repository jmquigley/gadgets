"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import ListHeader from "./ListHeader";

test("Test the creation of a ListHeader control with simple title", () => {
	const ctl = shallow(<ListHeader title='test title' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
