'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Container, getDefaultContainerProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Container props object', t => {
	const props = getDefaultContainerProps();

	t.truthy(props);

	t.true('children' in props);
	t.is(props.children, null);
});

test('Test creation of a Container control', t => {
	const ctl = mount(
		<Container>
			<p>Test Container</p>
		</Container>
	);

	t.truthy(ctl);

	t.is(ctl.find('.ui-container').length, 1);
	t.is(ctl.find('.container').length, 1);
	t.is(ctl.prop('id'), '');
	t.true(ctl.contains(<p>Test Container</p>));
});

test('Test creation of a Container control with an id value', t => {
	const ctl = mount(
		<Container id="testid">
			<p>Test Container</p>
		</Container>
	);

	t.truthy(ctl);

	t.is(ctl.find('.ui-container').length, 1);
	t.is(ctl.find('.container').length, 1);
	t.is(ctl.prop('id'), 'testid');
	t.true(ctl.contains(<p>Test Container</p>));
});
