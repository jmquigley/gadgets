'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
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
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('title'), 'test title');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
});
