import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import Item from "./Item";

test("Test the creation of a Item control", () => {
	const ctl = shallow(<Item title='test title' widget='widget' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test adding a right and left button, click
// TODO: create item disable test case
// TODO; create item visible test case
