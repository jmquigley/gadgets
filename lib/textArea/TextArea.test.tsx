"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	getDefaultTextAreaProps,
	getDefaultTextAreaState,
	TextArea
} from "./index";

test("Test retrieval of TextArea props object", () => {
	const props = getDefaultTextAreaProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultTextAreaState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Create a simple TextArea widget", () => {
	const ctl = mount(<TextArea rows={10} value='some text' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
