"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {getDefaultPreviewProps, Preview} from "./index";

test("Test retrieval of Preview props object", () => {
	const props = getDefaultPreviewProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test("Create a simple Preview widget", () => {
	const ctl = mount(<Preview />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
