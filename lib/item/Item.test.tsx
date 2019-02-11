"use strict";

import {shallow} from "enzyme";
import * as React from "react";
import {getDefaultItemProps, Item} from "./index";

test("Test retrieval of Item props object", () => {
	const props = getDefaultItemProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test("Test the creation of a Item control", () => {
	const ctl = shallow(<Item title='test title' widget='widget' />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

// TODO: test adding a right and left button, click
// TODO: create item disable test case
// TODO; create item visible test case
