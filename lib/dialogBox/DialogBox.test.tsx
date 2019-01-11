'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {DialogBox, DialogBoxType, getDefaultDialogBoxProps} from '../../dist/bundle';

test('Test retrieval of DialogBox props object', () => {
	const props = getDefaultDialogBoxProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a default DialogBox control', () => {
	const ctl = shallow(<DialogBox className="test-class" />);

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of an custom DialogBox', () => {
	const ctl = shallow(
		<DialogBox
			dialogType={DialogBoxType.custom}
			iconName="car"
			message="Sample info message"
			show
			style={{
				color: 'magenta'
			}}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test pressing the "yes" button on the default DialogBox', () => {
	const selection = jest.fn();
	const ctl = shallow(
		<DialogBox
			message="Testing click handler for yes"
			onSelection={selection}
			show
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	expect(ctl.state('showModal')).toBe(true);
});
