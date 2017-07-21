'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {DialogBox, DialogBoxType, getDefaultDialogBoxProps} from '../index';

test('Test retrieval of DialogBox props object', () => {
	const props = getDefaultDialogBoxProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a default DialogBox control', () => {
	const ctl = shallow(<DialogBox className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an error DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.error}
			message="Sample error message"
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an warning DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.warning}
			message="Sample warning message"
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an success DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.success}
			message="Sample success message"
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an info DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.info}
			message="Sample info message"
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an custom DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			color="magenta"
			dialogType={DialogBoxType.custom}
			iconName="car"
			message="Sample info message"
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test pressing the "yes" button on the default DialogBox', () => {
	const selection = jest.fn();
	const ctl = mount(
		<DialogBox
			message="Testing click handler for yes"
			onSelection={selection}
			show
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert(ctl.state('showModal'));
});
