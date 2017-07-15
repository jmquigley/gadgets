'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {getDefaultIconProps, Icon} from '../index';

test('Test retrieval of the Icon props object', () => {
	const props = getDefaultIconProps();

	assert(props);

	assert('iconName' in props);
	assert.equal(props.iconName, 'bomb');

	assert('imageFile' in props);
	assert.equal(props.imageFile, '');

	assert('sizing' in props);
	assert.equal(props.sizing, Sizing.normal);
});

test('Test creation of an Icon control with icon', () => {
	const ctl = shallow(
		<Icon
			className="test-class"
			color="red"
			backgroundColor="blue"
			iconName="star"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of an Icon control with image', () => {
	const ctl = shallow(
		<Icon
			imageFile="./test-icon-image.png"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Icon control', () => {
	const ctl = mount(<Icon disabled={true} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.disabled').length, 1);
});

test('Test making the ButtonDialog invisible', () => {
	const ctl = mount(
		<Icon visible={false} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.invisible').length, 1);
});
