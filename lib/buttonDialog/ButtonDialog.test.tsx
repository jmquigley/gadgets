'use strict';

import {cleanup, header, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {ButtonDialog} from './index';

test.before(t => {
	header(path.basename(__filename), t);
});

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), undefined);
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
	t.true(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), undefined);

	ctl.find('i').simulate('click');
	t.true(ctl.state('visible'));
});

test('Test the disabling of the ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog enabled={false}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), undefined);
	t.is(ctl.find('.buttonDialogDisabled').length, 1);

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
	t.true(ctl.prop('enabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.prop('id'), undefined);
	t.is(ctl.find('.buttonDialogDisabled').length, 1);
	t.is(ctl.find('.buttonDialogInvisible').length, 1);

	ctl.find('i').simulate('click');
	t.false(ctl.state('visible'));
});
