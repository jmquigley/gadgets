import {mount} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import ListFooter from "./ListFooter";

test("Test the creation of a ListFooter control with simple title", () => {
	const ctl = mount(<ListFooter title='test title' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the ListFooter item
// TODO: make the ListFooter item invisible
