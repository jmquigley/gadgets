'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTitleProps, Title, TitleLayout} from '../index';

test('Test retrieval of Title props object', () => {
	const props = getDefaultTitleProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Title control with default props', () => {
	const ctl = shallow(<Title className="test-class" title="Test label text" testing/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with quarter layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.quarter}
			title="Test label text"
			widget="widget"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with even layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.even}
			title="Test label text"
			widget="widget"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with threequarter layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.threequarter}
			title="Test label text"
			widget="widget"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with thirds layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.third}
			title="Test label text"
			widget="widget"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with stacked layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.stacked}
			title="Test label text"
			widget="widget"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with no layout', () => {
	const ctl = shallow(
		<Title
			layout={TitleLayout.none}
			title="Test label text"
			testing
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Title control with bad layout', () => {
	const ctl = mount(<Title layout={9999} title="Test label text" testing/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert.equal(ctl.prop('widget'), null);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling the Title control', () => {
	const ctl = mount(<Title disabled={true} title="Test label text" testing/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the Title control invisible', () => {
	const ctl = mount(<Title visible={false} title="Test label text" testing/>);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});
