"use strict";

import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {WebView} from "./WebView";

test("Test creation of a WebView instance", () => {
	const ctl = mount(<WebView />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
