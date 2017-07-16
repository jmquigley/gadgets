'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTriangleProps, Triangle} from '../index';

test('Test retrieval of Triangle props object', () => {
	const props = getDefaultTriangleProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Triangle control', () => {
	const ctl = shallow(<Triangle className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: create a Triangle with different color properties
// TODO: create a Triangle test for each direction
