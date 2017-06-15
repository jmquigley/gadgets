'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Badge, getDefaultBadgeProps} from './index';
import {Location} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Badge props object', t => {
	const props = getDefaultBadgeProps();

	t.true('counter' in props);
	t.is(props.counter, 0);

	t.true('location' in props);
	t.is(props.location, Location.topRight);
});

test('Test creation of a Badge control', t => {
	const ctl = mount(<Badge className="test-class">Test Component</Badge>);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});
