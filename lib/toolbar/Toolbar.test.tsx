import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Button} from "../button/Button";
import {Justify, Sizing} from "../shared";
import Toolbar from "./Toolbar";

[Justify.left, Justify.right, Justify.center].forEach((justify: Justify) => {
	test(`Test creation of a Toolbar instance with ${Justify[justify]} justification`, () => {
		const ctl = shallow(
			<Toolbar justify={justify} sizing={Sizing.small}>
				<Button iconName='car' />
				<div>blah</div>
			</Toolbar>
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
});

test("Test disabling of a Toolbar instance", () => {
	const ctl = shallow(
		<Toolbar disabled>
			<Button iconName='car' />
			<div>blah</div>
		</Toolbar>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test making the Toolbar invisible", () => {
	const ctl = shallow(
		<Toolbar visible={false}>
			<Button iconName='car' />
			<div>blah</div>
		</Toolbar>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
