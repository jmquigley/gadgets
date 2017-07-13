'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Sizing} from '../../shared';
import {getDefaultIconProps, Icon} from '../index';

test('Test retrieval of the Icon props object', () => {
	const props = getDefaultIconProps();

	expect(props).toBeTruthy();

	expect('iconName' in props).toBe(true);
	expect(props.iconName).toBe('bomb');

	expect('imageFile' in props).toBe(true);
	expect(props.imageFile).toBe('');

	expect('sizing' in props).toBe(true);
	expect(props.sizing).toBe(Sizing.normal);
});

test('Test creation of an Icon control with icon', () => {
	const ctl = mount(
		<Icon
			className="test-class"
			color="red"
			backgroundColor="blue"
			iconName="star"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('color')).toBe('red');
	expect(ctl.prop('backgroundColor')).toBe('blue');

	expect(ctl.find('.ui-icon').length).toBe(1);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-star').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);

	expect(ctl.find('i').length).toBe(1);
	expect(ctl.find('img').length).toBe(0);
});

test('Test creation of an Icon control with image', () => {
	const ctl = mount(
		<Icon
			imageFile="./test-icon-image.png"
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.find('.fa').length).toBe(0);
	expect(ctl.find('.fa-bomb').length).toBe(0);
	expect(ctl.find('i').length).toBe(0);
	expect(ctl.find('img').length).toBe(1);
});

test('Test the disabling of the Icon control', () => {
	const ctl = mount(<Icon disabled={true} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
});

test('Test making the ButtonDialog invisible', () => {
	const ctl = mount(
		<Icon visible={false} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
});
