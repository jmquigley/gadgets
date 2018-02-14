'use strict';

import {
	getDefaultDialogWindowProps
} from '../';

test('Test retrieval of DialogWindow props object', () => {
	const props = getDefaultDialogWindowProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});
