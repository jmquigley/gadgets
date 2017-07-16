'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultToastProps, Toast} from '../index';

test('Test retrieval of Toast props object', () => {
	const props = getDefaultToastProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Toast control', () => {
	const ctl = shallow(<Toast className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: create a Toast that decays, and validate that it has been closed
// TODO: create a toast that is persistent
// TODO: create a Toast control and click the close button
// TODO: add test to disable the Toast control
// TODO: add a test to make the Toast invisible
