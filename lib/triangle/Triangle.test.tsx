'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Triangle, getDefaultTriangleProps} from './index';
import {Direction, Sizing} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Triangle props object', t => {
	const props = getDefaultTriangleProps();

	t.truthy(props);

	t.true('backgroundColor' in props);
	t.is(props.backgroundColor, 'inherit');

	t.true('borderColor' in props);
	t.is(props.borderColor, 'inherit');

	t.true('borderWidth' in props);
	t.is(props.borderWidth, '2px');

	t.true('direction' in props);
	t.is(props.direction, Direction.up);

	t.true('nobase' in props);
	t.false(props.nobase);

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);

});

test('Test creation of a Triangle control', t => {
	const ctl = mount(<Triangle className="test-class" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});
