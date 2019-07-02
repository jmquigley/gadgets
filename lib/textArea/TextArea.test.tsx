import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import TextArea from "./TextArea";

test("Create a simple TextArea widget", () => {
	const ctl = mount(<TextArea rows={10} value='some text' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
