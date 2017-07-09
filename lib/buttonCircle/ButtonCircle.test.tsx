'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonCircle, getDefaultButtonCircleProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ButtonCircle props object', t => {
	const props = getDefaultButtonCircleProps();

	t.truthy(props);

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');
});

test('Test creation of a ButtonCircle control', t => {
	const ctl = mount(<ButtonCircle className="test-class" />);

	t.truthy(ctl);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.ui-button-circle').length, 1);
});

test('Test ButtonCircle click event', t => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	ctl.find('.ui-button').simulate('click');
	t.true(click.calledOnce);
});

test('Test disabling of a ButtonCircle control', t => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.disabled').length, 2);

	ctl.find('.ui-button').simulate('click');
	t.true(click.neverCalledWith());
});

test('Test making a ButtonCircle control invisible', t => {
	const click = sinon.spy();
	const ctl = mount(<ButtonCircle onClick={click} visible={false} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.invisible').length, 2);

	ctl.find('.ui-button').simulate('click');
	t.true(click.neverCalledWith());
});
