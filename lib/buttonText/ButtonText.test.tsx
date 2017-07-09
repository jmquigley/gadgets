'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonText, getDefaultButtonTextProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ButtonText props object', t => {
	const props = getDefaultButtonTextProps();

	t.truthy(props);

	t.true('iconName' in props);
	t.is(props.iconName, 'bomb');

	t.true('justify' in props);
	t.is(props.justify, ButtonText.RIGHT);

	t.true('text' in props);
	t.is(props.text, '');
});

test('Test creation of a ButtonText control to the left', t => {
	const ctl = mount(
		<ButtonText
		  className="test-class"
		  text="test text"
		  justify={ButtonText.LEFT}
		  color="white"
		  borderColor="green"
		  backgroundColor="blue"
		  />
	);

	t.truthy(ctl);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('text'), "test text");
	t.is(ctl.prop('justify'), ButtonText.LEFT);
	t.is(ctl.prop('color'), "white");
	t.is(ctl.prop('backgroundColor'), "blue");
	t.is(ctl.prop('borderColor'), "green");

	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.ui-button-text').length, 1);
	t.is(ctl.find('.buttonText').length, 1);
});

test('Test button click in ButtonText control', t => {
	let click = sinon.spy();
	const ctl = mount(
		<ButtonText
		  className="test-class"
		  text="test text"
		  onClick={click}
		  />
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('text'), "test text");

	let btn = ctl.find('.ui-button-text');
	t.is(btn.length, 1);
	btn.simulate('click');
	t.true(click.calledOnce);
});

test('Test disabling of a ButtonText control', t => {
	const click = sinon.spy();
	const ctl = mount(<ButtonText onClick={click} disabled={true} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.disabled').length, 1);

	ctl.find('.ui-button-text').simulate('click');
	t.true(click.neverCalledWith());
});

test('Test making a ButtonText control invisible', t => {
	const click = sinon.spy();
	const ctl = mount(<ButtonText onClick={click} visible={false} />);

	t.truthy(ctl);

	t.is(ctl.prop('iconName'), 'bomb');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.invisible').length, 1);

	ctl.find('.ui-button-text').simulate('click');
	t.true(click.neverCalledWith());
});
