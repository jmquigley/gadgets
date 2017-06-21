'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {DynamicList, getDefaultDynamicListProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of DynamicList props object', t => {
	const props = getDefaultDynamicListProps();

	t.truthy(props);

	t.true('title' in props);
	t.is(props.title, '');
});

test('Test creation of a DynamicList control', t => {
	const ctl = mount(<DynamicList className="test-class" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});
