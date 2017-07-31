'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {ButtonBar, getDefaultButtonBarProps} from '../index';

test('Test retrieval of ButtonBar props object', () => {
	const props = getDefaultButtonBarProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple ButtonBar instance', () => {
	const ctl = shallow(<ButtonBar className="test-class" />);

	assert(ctl)	;
	expect(ctl).toMatchSnapshot();
});

// TODO: add a test for each of the ButtonBar justifications
// TODO: add disable/visible test
