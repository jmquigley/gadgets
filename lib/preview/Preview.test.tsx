import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import Preview from "./Preview";

test("Create a simple Preview widget", () => {
	const ctl = mount(<Preview />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
