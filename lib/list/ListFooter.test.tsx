'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultListFooterProps, ListFooter} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ListFooter props object', t => {
	const props = getDefaultListFooterProps();

	t.truthy(props);
});

test('Test the creation of a ListFooter control with simple title', t => {
	const ctl = mount(
		<ListFooter
			title="test title"
		/>
	);

	t.truthy(ctl);

	t.is(ctl.prop('title'), 'test title');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-list-footer').length, 1);
	t.is(ctl.find('.listFooter').length, 1);
});

// TODO: test case for validating props object creator
// TODO: disabling the ListFooter item
// TODO: make the ListFooter item invisible
