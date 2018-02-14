'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {
	DialogWindow
	getDefaultDialogWindowProps
} from '../';

test('Test retrieval of DialogWindow props object', () => {
	const props = getDefaultDialogWindowProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a default DialogWindow control', () => {
	const ctl = shallow(
		<DialogWindow
			className="test-class"
			height="600px"
			icon="plane"
			show={true}
			title="Demo Dialog Window"
			width="600px"
		>
			<span>Dialog Content</span>
		</DialogWindow>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});
