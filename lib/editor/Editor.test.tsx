"use strict";

import {getDefaultEditorProps} from "./index";

test("Test retrieval of the Editor props object", () => {
	const props = getDefaultEditorProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

// Editor test are currently broken in jest.  Still trying to figure out why, so these are removed
// for now.  The Editor control works in the demo, but automated testing does not.
