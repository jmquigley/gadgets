'use strict';

import {shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultSelectProps, Select} from './index';

test('Test retrieval of Select props object', () => {
	const props = getDefaultSelectProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Select control', () => {
	const ctl = shallow(<Select className="test-class" />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

// TODO: disabling the select control
// TODO: make the select control invisible
// TODO: test adding/retrieving text example from the Select control
