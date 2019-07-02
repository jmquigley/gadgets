"use strict";

import {shallow} from "enzyme";
import assert from "power-assert";
import * as React from "react";
import DialogBox, {DialogBoxType} from "./DialogBox";

test("Test creation of a default DialogBox control", () => {
	const ctl = shallow(<DialogBox className='test-class' />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of an error DialogBox", () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.error}
			message='Sample error message'
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of an warning DialogBox", () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.warning}
			message='Sample warning message'
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of an success DialogBox", () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.success}
			message='Sample success message'
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of an info DialogBox", () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.info}
			message='Sample info message'
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test("Test the creation of an custom DialogBox", () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.custom}
			iconName='car'
			message='Sample info message'
			show
			style={{
				color: "magenta"
			}}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test pressing the "yes" button on the default DialogBox', () => {
	const selection = jest.fn();
	const ctl = shallow(
		<DialogBox
			message='Testing click handler for yes'
			onSelection={selection}
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert(ctl.state("showModal"));
});
