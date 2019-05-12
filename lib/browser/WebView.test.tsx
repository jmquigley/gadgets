"use strict";

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {getDefaultWebViewProps, getDefaultWebViewState, WebView} from "./index";

test("Test retrieval of the WebView props object", () => {
	const props = getDefaultWebViewProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultWebViewState();

	assert(state);
	expect(state).toMatchSnapshot();
});

test("Test creation of a WebView instance", () => {
	const ctl = mount(<WebView />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
