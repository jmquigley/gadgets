'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Badge, getDefaultBadgeProps} from './index';
import {Location, Sizing} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Badge props object', t => {
	const props = getDefaultBadgeProps();

	t.true('counter' in props);
	t.is(props.counter, 0);

	t.true('location' in props);
	t.is(props.location, Location.topRight);

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);

	t.true('suppress' in props);
	t.false(props.suppress);
});

test('Test creation of a Badge control', t => {
	const ctl = mount(
		<Badge
			backgroundColor="blue"
			className="test-class"
			color="red"
			suppress
			counter={-1}
			>
			Test Component
		</Badge>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('backgroundColor'), 'blue');
	t.is(ctl.prop('color'), 'red');
	t.is(ctl.prop('counter'), -1);
	t.false(ctl.prop('disabled'));
	t.is(ctl.prop('id'), '');
	t.true(ctl.prop('suppress'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.ui-badge').length, 0);
});

test('Test clicking a Badge counter control', t => {
	const click = sinon.spy();
	const ctl = mount(
		<Badge
			counter={1}
			onClick={click}
			>
			Test Component
		</Badge>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	ctl.find('.ui-badge').simulate('click');
	t.true(click.calledOnce);
});
