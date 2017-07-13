'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultTitleProps, Title, TitleLayout} from '../index';

function validate(ctl: any) {
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-title-bar').length).toBe(1);
	expect(ctl.find('.ui-title').length).toBe(1);
	expect(ctl.find('.ui-title-widget').length).toBe(1);
}

test('Test retrieval of Title props object', () => {
	const props = getDefaultTitleProps();

	expect(props).toBeTruthy();

	expect('layout' in props).toBe(true);
	expect(props.layout).toBe(TitleLayout.dominant);

	expect('widget' in props).toBe(true);
	expect(props.widget).toBeNull();
});

test('Test creation of a Title control with default props', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Title className="test-class">{s}</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBeNull();
	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.text()).toBe(s);
});

test('Test creation of a Title control with bad layout', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Title layout={9999}>{s}</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBeNull();
	expect(ctl.text()).toBe(s);
});

test('Test creation of a Title control with quarter layout', () => {
	const s: string = 'Test label text';
	const w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.quarter}
			widget={w}
		>
			{s}
		</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBe('widget');
	expect(ctl.text()).toBe(`${s}${w}`);
});

test('Test creation of a Title control with even layout', () => {
	const s: string = 'Test label text';
	const w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.even}
			widget={w}
		>
			{s}
		</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBe('widget');
	expect(ctl.text()).toBe(`${s}${w}`);
});

test('Test creation of a Title control with threequarter layout', () => {
	const s: string = 'Test label text';
	const w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.threequarter}
			widget={w}
		>
			{s}
		</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBe('widget');
	expect(ctl.text()).toBe(`${s}${w}`);
});

test('Test creation of a Title control with stacked layout', () => {
	const s: string = 'Test label text';
	const w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.stacked}
			widget={w}
		>
			{s}
		</Title>);

	validate(ctl);

	expect(ctl.prop('widget')).toBe('widget');
	expect(ctl.text()).toBe(`${s}${w}`);
});

test('Test disabling the Title control', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Title disabled={true}>{s}</Title>);

	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.text()).toBe(s);
	expect(ctl.find('.ui-title-bar').length).toBe(1);
	expect(ctl.find('.ui-title').length).toBe(1);
	expect(ctl.find('.ui-title-widget').length).toBe(1);
});

test('Test making the Title control invisible', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Title visible={false}>{s}</Title>);

	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
	expect(ctl.text()).toBe(s);
	expect(ctl.find('.ui-title-bar').length).toBe(1);
	expect(ctl.find('.ui-title').length).toBe(1);
	expect(ctl.find('.ui-title-widget').length).toBe(1);
});
