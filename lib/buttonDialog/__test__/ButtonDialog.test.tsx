'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Location} from '../../shared';
import {ButtonDialog, getDefaultButtonDialogProps} from '../index';

test('Test retrieval of ButtonDialog props object', () => {
	const props = getDefaultButtonDialogProps();

	expect(props).toBeTruthy();

	expect('dialogClasses' in props).toBe(true);
	expect(props.dialogClasses instanceof Array).toBe(true);
	expect(props.dialogClasses.length).toBe(0);
});

test('Test creation of a ButtonDialog control', () => {
	const ctl = mount(
		<ButtonDialog
			className="test-class"
			dialogClasses={['test-class-dialog']}
		>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('className')).toBe('test-class');
	expect(ctl.prop('dialogClasses').join('').trim()).toBe('test-class-dialog');

	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);
});

test('Test creation of a ButtonDialog control on top', () => {
	const ctl = mount(
		<ButtonDialog
			className="test-class"
			dialogClasses={['test-class-dialog']}
			location={Location.top}
		>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('location')).toBe(Location.top);
	expect(ctl.prop('className')).toBe('test-class');
	expect(ctl.prop('dialogClasses').join('').trim()).toBe('test-class-dialog');

	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);
});

test('Test the click event on a ButtonDialog control', () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);

	ctl.find('.ui-button').simulate('click');
	expect(ctl.state('visible')).toBe(true);
});

test('Test the disabling of the ButtonDialog control', () => {
	const ctl = mount(
		<ButtonDialog disabled={true}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);

	ctl.find('.ui-button').simulate('click');
	expect(ctl.state('visible')).toBe(false);
});

test('Test making the ButtonDialog invisible', () => {
	const ctl = mount(
		<ButtonDialog visible={false}>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('iconName')).toBe('bomb');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);

	ctl.find('.ui-button').simulate('click');
	expect(ctl.state('visible')).toBe(false);
});

test('Test opening the button dialog window', () => {
	const ctl = mount(
		<ButtonDialog>
			<p>Dialog test</p>
		</ButtonDialog>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.contains(<p>Dialog test</p>)).toBe(true);
	ctl.find('.ui-button').simulate('click');
	expect(ctl.state('visible')).toBe(true);
});
