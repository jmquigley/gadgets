"use strict";

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Browser, getDefaultBrowserProps, getDefaultBrowserState} from "./index";

test("Test retrieval of the Browser props object", () => {
	const props = getDefaultBrowserProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultBrowserState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a Browser instance", () => {
	const ctl = mount(<Browser uri='http://example.com' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a Browser instance with empty uri values", () => {
	const ctl = mount(<Browser uri='' home='' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
