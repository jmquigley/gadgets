'use strict';

import {cleanup, header, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Button} from './index';

test.before(t => {
	header(path.basename(__filename), t);
});

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a Button control', t => {
	const ctl = mount(<Button />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), undefined);
	t.true(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui').length, 1);
	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
});

test('Test creation of a Button control with custom icon', t => {
	const ctl = mount(<Button iconName="superpowers" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'superpowers');
	t.is(ctl.prop('id'), undefined);
	t.true(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui').length, 1);
	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-superpowers').length, 1);
});

test('Test Button click event', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), undefined);
	t.true(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));

	ctl.find('i').simulate('click');
	t.true(click.calledOnce);
});

test('Test disabling of a Button', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} enabled={false} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('enabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.buttonDisabled').length, 1);

	ctl.find('i').simulate('click');
	t.true(click.neverCalledWith());
});

test('Test making a Button invisible', t => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} visible={false} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), undefined);
	t.true(ctl.prop('enabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.buttonDisabled').length, 1);
	t.is(ctl.find('.buttonInvisible').length, 1);

	ctl.find('i').simulate('click');
	t.true(click.neverCalledWith());
});
