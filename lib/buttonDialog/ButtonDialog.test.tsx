'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {ButtonDialog} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a ButtonDialog control', t => {
	const ctl = mount(
		<ButtonDialog className="test-class">
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
	t.is(ctl.find('.test-class').length, 1);
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

	ctl.find('i').simulate('click');
	t.false(ctl.state('visible'));
});

// :TODO: Add tests for exposed dialog popup
