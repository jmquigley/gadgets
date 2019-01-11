'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultListDividerProps, ListDivider} from '../../dist/bundle';

test('Test retrieval of ListHeader props object', () => {
	const props = getDefaultListDividerProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListDivider control', () => {
	const ctl = shallow(
		<ListDivider color="blue" />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
