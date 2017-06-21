'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultIconProps, Icon} from './index';
import {Sizing} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Icon props object', t => {
	const props = getDefaultIconProps();

	t.truthy(props);

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');

	t.true('imageFile' in props);
	t.is(props.imageFile, '');

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);
});

test('Test creation of a Icon control with icon', t => {
	const ctl = mount(<Icon className="test-class" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-icon').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});
