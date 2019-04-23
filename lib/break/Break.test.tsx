"use strict";

import {EnumValues as ev} from "enum-values";
import {shallow} from "enzyme";
import * as React from "react";
import {Sizing} from "../shared";
import {Break} from "./index";

let count: number = 1;

for (const sizing of ev.getNames(Sizing)) {
	test("Test creation of a Break control of size ${sizing}", () => {
		const ctl = shallow(<Break n={count} sizing={Sizing[sizing]} />);
		count++;

		expect(ctl).toBeDefined();
		expect(ctl).toMatchSnapshot();
	});
}
