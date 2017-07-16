'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Select} from '../index';

test('Test creation of a Select control', () => {
	const ctl = shallow(<Select className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: disabling the select control
// TODO: make the select control invisible
// TODO: test adding/retrieving text example from the Select control
