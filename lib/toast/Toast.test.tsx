'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Toast, ToastLevel, ToastType, getDefaultToastProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Toast props object', t => {
	const props = getDefaultToastProps();

	t.truthy(props);

	t.true('bottom' in props);
	t.is(props.bottom, false);

	t.true('duration' in props);
	t.is(props.duration, 3);

	t.true('level' in props);
	t.is(props.level, ToastLevel.info);

	t.true('type' in props);
	t.is(props.type, ToastType.decay);
});

test('Test creation of a Toast control', t => {
	const ctl = mount(<Toast className="test-class" />);

	t.truthy(ctl);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});

// TODO: create a Toast that decays, and validate that it has been closed
// TODO: create a toast that is persistent
// TODO: create a Toast control and click the close button
// TODO: add test to disable the Toast control
// TODO: add a test to make the Toast invisible
