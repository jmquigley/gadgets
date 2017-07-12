'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Sizing} from '../shared';
import {getDefaultTextFieldProps, TextField} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of TextField props object', t => {
	const props = getDefaultTextFieldProps();

	t.truthy(props);

	t.true('disabled' in props);
	t.false(props.disabled);

	t.true('id' in props);
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
	t.true(props.visible);
});

function validate(ctl: any, t: any) {
	t.truthy(ctl);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-textfield').length, 1);
	t.is(ctl.find('.textFieldInput').length, 1);
}

test('Test creation of a TextField control', t => {
	const ctl = mount(<TextField className="test-class" />);

	validate(ctl, t);
	t.is(ctl.prop('sizing'), Sizing.normal);
	t.false(ctl.prop('usevalidation'))
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.textFieldMessage').length, 0);
});

test('Test creation of a textfield with min/max validation', t => {
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

	validate(ctl, t);

	t.true(ctl.state('valid'));
	ctl.find('input').simulate('keyPress', {key: 'a'});
	// t.false(ctl.state('valid'));
	// t.true(keypress.calledOnce);
});


// TODO: disabling the TextField control
// TODO: make the TextField invisible
// TODO: test adding/retrieving text example from the TextField control
// TODO: test validation routines
