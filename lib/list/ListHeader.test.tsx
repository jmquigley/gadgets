'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultListHeaderProps, ListHeader} from './index';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListHeaderProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListHeader control with simple title', () => {
	const ctl = shallow(
		<ListHeader
			title="test title"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
