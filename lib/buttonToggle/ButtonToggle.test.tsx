'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {ButtonToggle, getDefaultButtonToggleProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of ButtonToggle props object', t => {
	const props = getDefaultButtonToggleProps();

	t.truthy(props);

	t.true('bgColorOff' in props);
	t.is(props.bgColorOff, 'inherit');

	t.true('bgColorOn' in props);
	t.is(props.bgColorOn, 'inherit');

	t.true('fgColorOff' in props);
	t.is(props.fgColorOff, 'gray');

	t.true('fgColorOn' in props);
	t.is(props.fgColorOn, 'black');

	t.true('initialToggle' in props);
	t.false(props.initialToggle);

	t.true('iconNameOff' in props);
	t.is(props.iconNameOff, 'bomb');

	t.true('iconNameOn' in props);
	t.is(props.iconNameOn, 'bomb');
});


test('Test creation of a ButtonToggle control', t => {
	const ctl = mount(<ButtonToggle className="test-class"/>);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button-toggle').length, 1);
	t.is(ctl.find('.fa').length, 1);
	t.is(ctl.find('.fa-bomb').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});


test('Test creation of a ButtonToggle control with on/off icons', t => {
 	const ctl = mount(<ButtonToggle
						  iconNameOn="star"
						  iconNameOff="star-o"
					  />);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('iconName'), 'bomb');
 	t.is(ctl.prop('id'), '');
	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('iconNameOn'), 'star');
	t.is(ctl.prop('iconNameOff'), 'star-o');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-button-toggle').length, 1);
 	t.is(ctl.find('.fa').length, 1);
 	t.is(ctl.find('.fa-star-o').length, 1);
});

test('Test ButtonToggle click event', t => {
 	const click = sinon.spy();
 	const ctl = mount(<ButtonToggle
						  iconNameOn="star"
						  iconNameOff="star-o"
						  onClick={click}
					  />);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('iconName'), 'bomb');
 	t.is(ctl.prop('id'), '');
	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('iconNameOn'), 'star');
	t.is(ctl.prop('iconNameOff'), 'star-o');

 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	ctl.find('.ui-button-toggle').simulate('click');
 	t.true(click.calledOnce);
});

test('Test disabling of a ButtonToggle', t => {
 	const click = sinon.spy();
 	const ctl = mount(<ButtonToggle onClick={click} disabled={true} />);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('iconName'), 'bomb');
 	t.true(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));
 	t.is(ctl.find('.disabled').length, 1);

 	ctl.find('.ui-button-toggle').simulate('click');
 	t.true(click.neverCalledWith());
});

test('Test making a ButtonToggle invisible', t => {
 	const click = sinon.spy();
 	const ctl = mount(<ButtonToggle onClick={click} visible={false} />);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('iconName'), 'bomb');
 	t.is(ctl.prop('id'), '');
 	t.false(ctl.prop('disabled'));
 	t.false(ctl.prop('visible'));
 	t.is(ctl.find('.invisible').length, 1);

 	ctl.find('.ui-button-toggle').simulate('click');
 	t.true(click.neverCalledWith());
});

test('Test the icon switch in a ButtonToggle click', t => {
 	const click = sinon.spy();
 	const ctl = mount(<ButtonToggle
						  iconNameOff='star-o'
						  iconNameOn='star'
						  onClick={click}
					  />);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));
 	t.is(ctl.prop('iconName'), 'bomb');
	t.is(ctl.prop('iconNameOn'), 'star');
	t.is(ctl.prop('iconNameOff'), 'star-o');

	t.false(ctl.state('toggle'));
	ctl.find('.ui-button-toggle').simulate('click');
	t.true(click.calledOnce);
	t.true(ctl.state('toggle'));
});
