'use strict';

import * as assert from 'assert';
import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {Sizing} from '../../shared';
import {Button, getDefaultButtonProps} from '../index';

test('Test retrieval of Button props object', () => {
	const props = getDefaultButtonProps();

	assert(props);

	assert('iconName' in props);
	assert(props.iconName === 'bomb');

	assert('iconStyle' in props);
	assert(props.iconStyle === '');

	assert('sizing' in props);
	assert(props.sizing === Sizing.normal);
});

test('Test creation of a Button control', () => {
	const ctl = mount(<Button className="test-class"/>);

	assert(ctl);

	assert(ctl.prop('iconName') === 'bomb');
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	assert(ctl.find('.ui-button').length === 1);
	assert(ctl.find('.button').length === 1);
	assert(ctl.find('.fa').length === 1);
	assert(ctl.find('.fa-bomb').length === 1);
	assert(ctl.find('.test-class').length === 1);
});

test('Test creation of a Button control with custom icon, colors, and border', () => {
	const ctl = mount(
		<Button
			color="red"
			backgroundColor="black"
			borderColor="green"
			borderWidth="2px"
			iconName="superpowers"
		/>
	);

	assert(ctl);

	assert(ctl.prop('iconName') === 'superpowers');
	assert(ctl.prop('color') === 'red');
	assert(ctl.prop('backgroundColor') === 'black');
	assert(ctl.prop('borderColor') === 'green');
	assert(ctl.prop('borderWidth') === '2px');

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	assert(ctl.find('.ui-button').length === 1);
	assert(ctl.find('.fa').length === 1);
	assert(ctl.find('.fa-superpowers').length === 1);
});

test('Test Button click event', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} />);

	assert(ctl);

	assert(ctl.prop('iconName') === 'bomb');
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	ctl.find('i').simulate('click');
	assert(click.calledOnce);
});

test('Test disabling of a Button', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} disabled={true} />);

	assert(ctl);

	assert(ctl.prop('iconName') === 'bomb');
	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert(ctl.find('.disabled').length === 1);

	ctl.find('i').simulate('click');
	assert(click.neverCalledWith() === true);
});

test('Test making a Button invisible', () => {
	const click = sinon.spy();
	const ctl = mount(<Button onClick={click} visible={false} />);

	assert(ctl);

	assert(ctl.prop('iconName') === 'bomb');
	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert(ctl.find('.invisible').length === 1);

	ctl.find('i').simulate('click');
	assert(click.neverCalledWith());
});
