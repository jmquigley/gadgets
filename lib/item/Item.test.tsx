'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultItemProps, Item} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Item props object', t => {
	const props = getDefaultItemProps();

	t.truthy(props);
});

test('Test the creation of a Item control', t => {
	const ctl = mount(
		<Item
			title="test title"
		/>
	);

	t.truthy(ctl);

	t.is(ctl.prop('title'), 'test title');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
});

// TODO: test adding a right and left button, click
// TODO: create item disable test case
// TODO; create item visible test case
