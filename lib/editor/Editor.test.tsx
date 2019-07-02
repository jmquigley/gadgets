import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import "../globals";
import Editor from "./Editor";

const debug = require("debug")("gadgets.test.Editor");

beforeEach(() => {
	document.body.innerHTML = `<div id="Editor-0"></div>`;
	debug("innerHTML: %O", window.document.body.innerHTML);
});

test("Test creation of an Editor control", () => {
	const ctl = mount(<Editor />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
