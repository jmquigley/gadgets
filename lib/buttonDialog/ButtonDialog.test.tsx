'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {ButtonDialog, getDefaultButtonDialogProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ButtonDialog props object', t => {
	const props = getDefaultButtonDialogProps();

	t.truthy(props);

	t.true('dialogClasses' in props);
	t.true(props.dialogClasses instanceof Array);
	t.is(props.dialogClasses.length, 0);
});

test('Test creation of a ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog
			className="test-class"
			dialogClasses={["test-class-dialog"]}
			>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.is(ctl.prop('className'), 'test-class');
	t.is(ctl.prop('dialogClasses').join('').trim(), 'test-class-dialog');

	t.true(ctl.contains(<p>Dialog test</p>));
});

test('Test the click event on a ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.true(ctl.contains(<p>Dialog test</p>));

	ctl.find('i').simulate('click');
	t.true(ctl.state('visible'));
});

test('Test the disabling of the ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog disabled={true}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.is(ctl.find('.disabled').length, 2); // on control and button

	ctl.find('i').simulate('click');
	t.false(ctl.state('visible'));
});

test('Test the making the ButtonDialog invisible', t => {
	const ctl = mount(
		<ButtonDialog visible={false}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.is(ctl.find('.invisible').length, 2);
	t.true(ctl.contains(<p>Dialog test</p>));

	ctl.find('.ui-button').simulate('click');
	t.false(ctl.state('visible'));
});

test('Test opening the button dialog window', t => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);
	t.true(ctl.contains(<p>Dialog test</p>));

	ctl.find('.ui-button').simulate('click');
	t.true(ctl.state('visible'));
});
