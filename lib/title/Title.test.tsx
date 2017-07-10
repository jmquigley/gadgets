'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultTitleProps, Title, TitleLayout} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

function validate(ctl: any, t: any) {
	t.truthy(ctl);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-title-bar').length, 1);
	t.is(ctl.find('.ui-title').length, 1);
	t.is(ctl.find('.ui-title-widget').length, 1);
}

test('Test retrieval of Title props object', t => {
	const props = getDefaultTitleProps();

	t.truthy(props);

	t.true('layout' in props);
	t.is(props.layout, TitleLayout.dominant);

	t.true('widget' in props);
	t.is(props.widget, null);
});

test('Test creation of a Title control with default props', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Title className="test-class">{s}</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), null);
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.text(), s);
	t.is(ctl.find('.titleDominant').length, 1);
	t.is(ctl.find('.widgetDominant').length, 1);
});

test('Test creation of a Title control with bad layout', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Title layout={9999}>{s}</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), null);
	t.is(ctl.text(), s);
	t.is(ctl.find('.titleDominant').length, 1);
	t.is(ctl.find('.widgetDominant').length, 1);
});

test('Test creation of a Title control with quarter layout', t => {
	let s: string = 'Test label text';
	let w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.quarter}
			widget={w}>
			{s}
		</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), 'widget');
	t.is(ctl.text(), `${s}${w}`);
	t.is(ctl.find('.titleQuarter').length, 1);
	t.is(ctl.find('.widgetQuarter').length, 1);
});

test('Test creation of a Title control with even layout', t => {
	let s: string = 'Test label text';
	let w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.even}
			widget={w}>
			{s}
		</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), 'widget');
	t.is(ctl.text(), `${s}${w}`);
	t.is(ctl.find('.titleEven').length, 1);
	t.is(ctl.find('.widgetEven').length, 1);
});

test('Test creation of a Title control with threequarter layout', t => {
	let s: string = 'Test label text';
	let w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.threequarter}
			widget={w}>
			{s}
		</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), 'widget');
	t.is(ctl.text(), `${s}${w}`);
	t.is(ctl.find('.titleThreeQuarter').length, 1);
	t.is(ctl.find('.widgetThreeQuarter').length, 1);
});

test('Test creation of a Title control with stacked layout', t => {
	let s: string = 'Test label text';
	let w: string = 'widget';

	const ctl = mount(
		<Title
			layout={TitleLayout.stacked}
			widget={w}>
			{s}
		</Title>);

	validate(ctl, t);

	t.is(ctl.prop('widget'), 'widget');
	t.is(ctl.text(), `${s}${w}`);
	t.is(ctl.find('.titleStacked').length, 1);
	t.is(ctl.find('.widgetStacked').length, 1);
});

test('Test disabling the Title control', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Title disabled={true}>{s}</Title>);

	t.truthy(ctl);
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.text(), s);
	t.is(ctl.find('.ui-title-bar').length, 1);
	t.is(ctl.find('.ui-title').length, 1);
	t.is(ctl.find('.ui-title-widget').length, 1);
	t.is(ctl.find('.titleDominant').length, 1);
	t.is(ctl.find('.widgetDominant').length, 1);
	t.is(ctl.find('.disabled').length, 1);
});

test('Test making the Title control invisible', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Title visible={false}>{s}</Title>);

	t.truthy(ctl);
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.text(), s);
	t.is(ctl.find('.ui-title-bar').length, 1);
	t.is(ctl.find('.ui-title').length, 1);
	t.is(ctl.find('.ui-title-widget').length, 1);
	t.is(ctl.find('.titleDominant').length, 1);
	t.is(ctl.find('.widgetDominant').length, 1);
	t.is(ctl.find('.invisible').length, 1);
});
