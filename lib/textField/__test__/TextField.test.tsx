'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {Sizing} from '../../shared';
import {getDefaultTextFieldProps, TextField} from '../index';

test('Test retrieval of TextField props object', () => {
	const props = getDefaultTextFieldProps();

	expect(props).toBeTruthy();

	expect('disabled' in props).toBe(true);
	expect(props.disabled).toBe(false);

	expect('id' in props).toBe(true);
	expect(props.id).toBe('');

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);

	expect('type' in props).toBe(true);
	expect(props.type).toBe('text');

	expect('usevalidation' in props).toBe(true);
	expect(props.usevalidation).toBe(false);

	expect('validators' in props).toBe(true);
	expect(props.validators instanceof Array).toBe(true);
	expect(props.validators.length).toBe(0);

	expect('visible' in props).toBe(true);
	expect(props.visible).toBe(true);
});

function validate(ctl: any) {
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-textfield').length).toBe(1);
	/* 	expect(ctl.find('.textFieldInput').length).toBe(1);*/
}

test('Test creation of a TextField control', () => {
	const ctl = mount(<TextField className="test-class" />);

	validate(ctl);

	expect(ctl.prop('sizing')).toBe(Sizing.normal);
	expect(ctl.prop('usevalidation')).toBe(false);
	expect(ctl.find('.test-class').length).toBe(1);
});

test('Test creation of a textfield with min/max validation', () => {
	const keypress = sinon.spy();
	const ctl = mount(
		<TextField
			maxLength="10"
			minLength="5"
			onKeyPress={keypress}
			usevalidation
			value=""
		/>
	);

	validate(ctl);

	expect(ctl.state('valid')).toBe(true);
	ctl.find('input').simulate('keyPress', {key: 'a'});
	// expect(ctl.state('valid')).toBe(false);  TODO: fix this in TextField test
	// expect(keypress.calledOnce).toBe(true);
});

// TODO: disabling the TextField control
// TODO: make the TextField invisible
// TODO: test adding/retrieving text example from the TextField control
// TODO: test validation routines
