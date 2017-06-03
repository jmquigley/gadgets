'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultListHeaderProps, ListHeader} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ListHeader props object', t => {
	const props = getDefaultListHeaderProps();

	t.truthy(props);
});

test('Test the creation of a ListHeader control with simple title', t => {
	const ctl = mount(
		<ListHeader
			title="test title"
		/>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('title'), 'test title');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-list-header').length, 1);
	t.is(ctl.find('.listHeader').length, 1);
});
