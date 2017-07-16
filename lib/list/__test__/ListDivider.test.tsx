'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultListDividerProps, ListDivider} from '../index';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListDividerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListDivider control', () => {
	const ctl = shallow(
		<ListDivider color="blue" />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
