'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Button, getDefaultButtonProps} from './index';
import {Sizing} from '../shared';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Button props object', t => {
	const props = getDefaultButtonProps();

	t.truthy(props);

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');

	t.true('iconStyle' in props);
	t.is(props.iconStyle, '');

	t.true('sizing' in props);
	t.is(props.sizing, Sizing.normal);
});

test('Test creation of a Button control', t => {
	const ctl = mount(<Button className="test-class"/>);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});

test('Test creation of a Button control with custom icon, colors, and border', t => {
	const ctl = mount(
		<Button
			color="red"
			backgroundColor="black"
			borderColor="green"
			borderWidth="2px"
			iconName="superpowers"
			/>
	);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'superpowers');
	t.is(ctl.prop('id'), '');
	t.is(ctl.prop('color'), 'red');
	t.is(ctl.prop('backgroundColor'), 'black');
	t.is(ctl.prop('borderColor'), 'green');
	t.is(ctl.prop('borderWidth'), '2px');

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-superpowers').length, 1);
});

test('Test Button click event', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	ctl.find('i').simulate('click');
	t.true(click.calledOnce);
});

test('Test disabling of a Button', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.disabled').length, 1);

	ctl.find('i').simulate('click');
	t.true(click.neverCalledWith());
});

test('Test making a Button invisible', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} visible={false} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.invisible').length, 1);

	ctl.find('i').simulate('click');
	t.true(click.neverCalledWith());
});
