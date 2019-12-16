import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import IFrame from "./IFrame";

test("Create a simple IFrame widget", () => {
	const ctl = mount(<IFrame />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
