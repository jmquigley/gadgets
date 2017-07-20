'use strict';

import * as assert from 'assert';
import {shallow} from 'enzyme';
import * as React from 'react';
import {DialogBox, getDefaultDialogBoxProps} from '../index';

test('Test retrieval of DialogBox props object', () => {
	const props = getDefaultDialogBoxProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a DialogBox control', () => {
	const ctl = shallow(<DialogBox className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

// TODO: add a test for each of the five types of DialogBox
// TODO: disabling the DialogBox
// TODO: make the DialogBox invisible
