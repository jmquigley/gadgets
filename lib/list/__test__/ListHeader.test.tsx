'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultListHeaderProps, ListHeader} from '../index';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListHeaderProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListHeader control with simple title', () => {
	const ctl = shallow(
		<ListHeader
			title="test title"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
