import {EnumValues as ev} from "enum-values";
import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Direction, Sizing} from "../shared";
import Triangle from "./Triangle";

test("Test creation of a Triangle control", () => {
	const ctl = shallow(<Triangle className='test-class' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

for (const direction of ev.getNames(Direction)) {
	test(`Create a triangle in ${direction} direction`, () => {
		const ctl = mount(
			<Triangle
				className='test-class'
				direction={Direction[direction]}
				sizing={Sizing.large}
				style={{
					fill: "red",
					stroke: "green"
				}}
			/>
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}
