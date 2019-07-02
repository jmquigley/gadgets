"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import DialogWindow from "./DialogWindow";

test("Test creation of a default DialogWindow control", () => {
	const ctl = shallow(
		<DialogWindow
			className='test-class'
			height='600px'
			icon='plane'
			show={true}
			title='Demo Dialog Window'
			width='600px'
		>
			<span>Dialog Content</span>
		</DialogWindow>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
