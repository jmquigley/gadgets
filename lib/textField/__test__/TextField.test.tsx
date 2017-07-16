'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTextFieldProps, TextField} from '../index';

test('Test retrieval of TextField props object', () => {
	const props = getDefaultTextFieldProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a TextField control', () => {
	const ctl = shallow(<TextField className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a textfield with min/max validation', () => {
	const keypress = jest.fn();
	const ctl = mount(
		<TextField
			maxLength="10"
			minLength="5"
			onKeyPress={keypress}
			usevalidation
			value=""
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert(ctl.state('valid'));
	ctl.find('input').simulate('keyPress', {key: 'a'});
	// assert(ctl.state('valid')).toBe(false);  TODO: fix this in TextField test
	// assert(keypress.calledOnce).toBe(true);
});

// TODO: disabling the TextField control
// TODO: make the TextField invisible
// TODO: test adding/retrieving text example from the TextField control
// TODO: test validation routines
