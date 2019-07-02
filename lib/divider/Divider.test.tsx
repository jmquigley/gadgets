"use strict";

import {EnumValues as ev} from "enum-values";
import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {Sizing} from "../shared";
import Divider, {DividerType} from "./Divider";

for (const sizing of ev.getNames(Sizing)) {
	test(`Creation of the Divider control (${sizing})`, () => {
		const ctl = shallow(
			<Divider
				sizing={Sizing[sizing]}
				dividerType={DividerType.vertical}
			/>
		);

		assert(ctl);
		expect(ctl).toMatchSnapshot();
	});
}
