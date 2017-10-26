'use strict';

const debug = require('debug')('ListFooter.test');

import * as assert from 'assert';
import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultListFooterProps, ListFooter} from '../index';

test('Test retrieval of ListFooter props object', () => {
	const props = getDefaultListFooterProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListFooter control with simple title', () => {
	const ctl = mount(
		<ListFooter title="test title" />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the ListFooter item
// TODO: make the ListFooter item invisible
