'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultListDividerProps, ListDivider} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ListHeader props object', t => {
	const props = getDefaultListDividerProps();

	t.truthy(props);

	t.true('color' in props);
	t.is(props.color, 'lightgray');
});

test('Test the creation of a ListDivider control', t => {
	const ctl = mount(
		<ListDivider color="blue" />
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.prop('color'), 'blue');

	t.is(ctl.find('.ui-list-divider').length, 1);
	t.is(ctl.find('.listDivider').length, 1);
});
