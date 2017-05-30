'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Button} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test creation of a Button control', t => {
	const ctl = mount(<Button className="test-class"/>);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});

test('Test creation of a Button control with custom icon', t => {
	const ctl = mount(<Button iconName="superpowers" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'superpowers');
	t.is(ctl.prop('id'), '');
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
	log.debug(ctl.html(), __filename);

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
	log.debug(ctl.html(), __filename);

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
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.invisible').length, 1);

	ctl.find('i').simulate('click');
	t.true(click.neverCalledWith());
});
