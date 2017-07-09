'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
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

test('Test retrieval of the Icon props object', t => {
	const props = getDefaultIconProps();

	t.truthy(props);

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');

	t.true('imageFile' in props);
	t.is(props.imageFile, '');

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);
});

test('Test creation of an Icon control with icon', t => {
	const ctl = mount(
		<Icon
		className="test-class"
		color="red"
		backgroundColor="blue"
		iconName="star"
		/>
	);

	t.truthy(ctl);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('color'), 'red');
	t.is(ctl.prop('backgroundColor'), 'blue');

	t.is(ctl.find('.ui-icon').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-star').length, 1);
	t.is(ctl.find('.test-class').length, 1);

	t.is(ctl.find('i').length, 1);
	t.is(ctl.find('img').length, 0);
});

test('Test creation of an Icon control with image', t => {
	const ctl = mount(
		<Icon
		imageFile="./test-icon-image.png"
		/>
	);

	t.truthy(ctl);

	t.is(ctl.find('.fa').length, 0);
	t.is(ctl.find('.fa-bomb').length, 0);
	t.is(ctl.find('i').length, 0);
	t.is(ctl.find('img').length, 1);
});

test('Test the disabling of the Icon control', t => {
	const ctl = mount(<Icon disabled={true} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.is(ctl.find('.disabled').length, 1);
});

test('Test making the ButtonDialog invisible', t => {
	const ctl = mount(
		<Icon visible={false} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.prop('id'), '');
	t.is(ctl.find('.invisible').length, 1);
});
