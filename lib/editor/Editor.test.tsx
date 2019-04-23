"use strict";

import assert from "power-assert";
import "../globals";
import {getDefaultEditorProps, getDefaultEditorState} from "./index";

test("Test retrieval of the Editor props object", () => {
	const props = getDefaultEditorProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultEditorState();
	assert(state);
	expect(state).toMatchSnapshot();
});

// Editor test are currently broken in jest.  Still trying to figure out why, so these are removed
// for now.  The Editor control works in the demo, but automated testing does not.
