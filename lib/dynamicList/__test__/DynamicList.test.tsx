'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {DynamicList, getDefaultDynamicListProps} from '../index';

test('Test retrieval of DynamicList props object', () => {
	const props = getDefaultDynamicListProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a DynamicList control', () => {
	const ctl = shallow(<DynamicList className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: test case for validating props object creator
// TODO: disabling the DynamicList
// TODO: make the DynamicList invisible
