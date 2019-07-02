import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import ListDivider from "./ListDivider";

test("Test the creation of a ListDivider control", () => {
	const ctl = shallow(<ListDivider color='blue' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
