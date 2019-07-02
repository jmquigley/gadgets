"use strict";

import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import Icon from "./Icon";

test("Test creation of an Icon control with icon", () => {
	const ctl = shallow(
		<Icon
			className='test-class'
			iconName='star'
			style={{
				color: "red",
				backgroundColor: "blue"
			}}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test creation of an Icon control with image", () => {
	const ctl = shallow(<Icon imageFile='./test-icon-image.png' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the disabling of the Icon control", () => {
	const ctl = mount(<Icon disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the ButtonDialog invisible", () => {
	const ctl = mount(<Icon visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
