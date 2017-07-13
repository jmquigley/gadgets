'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultLabelProps, Label} from '../index';

test('Test retrieval of default Label props object', () => {
	const props = getDefaultLabelProps();

	expect(props).toBeTruthy();

	expect('text' in props).toBe(true);
	expect(props.text).toBe(' ');
});

test('Test creation of a Label control', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Label className="test-class" text={s} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-label').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.text()).toBe(s);
});

test('Test the disabling of the Label control', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Label disabled text={s} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-label').length).toBe(1);
	expect(ctl.text()).toBe(s);
});

test('Test making the Label control invisible', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Label visible={false} text={s} />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
	expect(ctl.find('.ui-label').length).toBe(1);
	expect(ctl.text()).toBe(s);
});

// TODO: add test for events: blur, change, click, doubleclick, keydown, keypress
