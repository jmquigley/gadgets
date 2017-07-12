'use strict';

/* import {mockupEnv} from '../../test/helpers';
 * mockupEnv();*/

/* import test from 'ava';*/
import {mount} from 'enzyme';
// import * as path from 'path';
import * as React from 'react';
// import * as sinon from 'sinon';
import {Sizing} from '../../shared';
import {getDefaultTextFieldProps, TextField} from '../index';

/* test.after.always.cb(t => {
 * 	cleanup(path.basename(__filename), t);
 * });*/

test('Test retrieval of TextField props object', () => {
	const props = getDefaultTextFieldProps();

	expect(props).toBeTruthy();

	expect('disabled' in props).toBe(true);
	expect(props.disabled).toBe(false);

	/* t.true('id' in props);
	   t.is(props.id, '');

	   t.true('sizing' in props);
	   t.is(props.sizing, Sizing.normal);

	   t.true('type' in props);
	   t.is(props.type, 'text');

	   t.true('usevalidation' in props);
	   t.false(props.usevalidation);

	   t.true('validators' in props);
	   t.true(props.validators instanceof Array);
	   t.is(props.validators.length, 0);

	   t.true('visible' in props);
	   t.true(props.visible);*/
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

	/* 	expect(ctl.find('.textFieldMessage').length).toBe(0);*/
});

/* test('Test creation of a textfield with min/max validation', t => {
 * 	const keypress = sinon.spy();
 * 	const ctl = mount(
 * 		<TextField
 * 			maxLength="10"
 * 			minLength="5"
 * 			onKeyPress={keypress}
 * 			usevalidation
 * 			value=""
 * 			/>
 * 	);
 *
 * 	validate(ctl, t);
 *
 * 	t.true(ctl.state('valid'));
 * 	ctl.find('input').simulate('keyPress', {key: 'a'});
 * 	t.false(ctl.state('valid'));
 * 	t.true(keypress.calledOnce);
 * });*/


// TODO: disabling the TextField control
// TODO: make the TextField invisible
// TODO: test adding/retrieving text example from the TextField control
// TODO: test validation routines
