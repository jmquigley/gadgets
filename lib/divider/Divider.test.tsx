"use strict";

import {EnumValues as ev} from "enum-values";
import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Sizing} from "../shared";
import {Divider, getDefaultDividerProps, getDefaultDividerState} from "./index";

test("Test retrieval of Divider props object", () => {
	const props = getDefaultDividerProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultDividerState();

	assert(state);
	expect(state).toMatchSnapshot();
});

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the Divider control (${sizing})`, () => {
		const ctl = shallow(<Divider sizing={Sizing[sizing]} />);
		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}
