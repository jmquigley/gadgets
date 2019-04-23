"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import {
	DialogWindow,
	getDefaultDialogWindowProps,
	getDefaultDialogWindowState
} from "./index";

test("Test retrieval of DialogWindow props object", () => {
	const props = getDefaultDialogWindowProps();

	assert(props);
	expect(props).toMatchSnapshot();

	const state = getDefaultDialogWindowState();

	assert(state);
	expect(state).toMatchSnapshot();
});

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
