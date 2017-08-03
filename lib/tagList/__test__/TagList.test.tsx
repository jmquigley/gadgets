'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTagListProps, TagList} from '../index';

test('Test retrieval of TagList props object', () => {
	const props = getDefaultTagListProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple TagList instance', () => {
	const ctl = shallow(
		<TagList />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
