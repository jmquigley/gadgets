'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultTitleProps, Title} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Title props object', t => {
	const props = getDefaultTitleProps();

	t.truthy(props);

	t.true('stacked' in props);
	t.false(props.stacked);

	t.true('widget' in props);
	t.is(props.widget, null);
});

test('Test creation of a Title control', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Title className="test-class">{s}</Title>);

	t.truthy(ctl);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-title').length, 1);
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.text(), s);
});

// TODO: add test for Title props retrieval
// TODO: disabling the Title control
// TODO: make the Title invisible
