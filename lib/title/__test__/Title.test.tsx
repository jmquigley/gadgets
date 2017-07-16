'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTitleProps, Title, TitleLayout} from '../index';

function validate(ctl: any) {
	assert(ctl);
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.ui-title-bar').length, 1);
	assert.equal(ctl.find('.ui-title').length, 1);
	assert.equal(ctl.find('.ui-title-widget').length, 1);
}

test('Test retrieval of Title props object', () => {
	const props = getDefaultTitleProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Title control with default props', () => {
	const ctl = shallow(<Title className="test-class">Test label text</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with quarter layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.quarter}
			widget="widget"
		>
			Test label text
		</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with even layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.even}
			widget="widget"
		>
			Test label text
		</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with threequarter layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.threequarter}
			widget="widget"
		>
			Test label text
		</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with stacked layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.stacked}
			widget="widget"
		>
			Test label text
		</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with bad layout', () => {
	const s: string = 'Test label text';
	const ctl = mount(<Title layout={9999}>{s}</Title>);

	validate(ctl);

	assert.equal(ctl.prop('widget'), null);
	assert.equal(ctl.text(), s);
});

test('Test disabling the Title control', () => {
	const ctl = mount(<Title disabled={true}>Test label text</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the Title control invisible', () => {
	const ctl = mount(<Title visible={false}>Test label text</Title>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
