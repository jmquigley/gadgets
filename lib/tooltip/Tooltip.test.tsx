import {EnumValues as ev} from "enum-values";
import {mount, shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Location} from "../shared";
import Tooltip from "./Tooltip";

for (const location of ev.getNames(Location)) {
	test(`Creation of Tooltip in position ${location}`, () => {
		const ctl = mount(<Tooltip location={location}>Test Text</Tooltip>);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}

test("Test creation of Tooltip location none", () => {
	const ctl = mount(<Tooltip location={Location.none}>Test Text</Tooltip>);
	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test creation of a Tooltip control", () => {
	const ctl = shallow(
		<Tooltip className='test-class' location={Location.middleRight}>
			<span>Test Text</span>
		</Tooltip>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test disabling of a Tooltip", () => {
	const ctl = shallow(<Tooltip disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test("Test making a Tooltip invisible", () => {
	const ctl = shallow(<Tooltip visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
