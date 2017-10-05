'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {Location} from '../../shared';
import {getDefaultTabContainerProps, Tab, TabContainer} from '../index';

test('Test retrieval of Tabs props object', () => {
	const props = getDefaultTabContainerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Create an empty TabContainer instance', () => {
	const ctl = mount(
		<TabContainer testing/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test TabContainer retrieval functions', () => {
	const ctl = mount(
		<TabContainer testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	assert(container);

	const id: string = container.tabs.get(0).props['id'];
	let tab;
	let idx;

	[tab, idx] = container._getTab(id);
	assert.equal(idx, 0);
	assert.equal(tab.props['id'], id);

	[tab, idx] = container._getTab('');
	assert(tab == null);
	assert(idx === -1);

	idx = container._getTabIdx(id);
	assert(idx === 0);

	idx = container._getTabIdx('');
	assert(idx === -1);
});

test('Test the creation of a TabContainer instance (top)', () => {
	const ctl = shallow(
		<TabContainer location={Location.top} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (bottom)', () => {
	const ctl = shallow(
		<TabContainer location={Location.bottom} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (left)', () => {
	const ctl = shallow(
		<TabContainer location={Location.left} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (right)', () => {
	const ctl = shallow(
		<TabContainer location={Location.right} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling the TabContainer instance', () => {
	const ctl = mount(
		<TabContainer disabled testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the TabContainer invisible', () => {
	const ctl = shallow(
		<TabContainer visible={false} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test selecting the first tab within the TabContainer', () => {
	const select = sinon.spy();
	const ctl = mount(
		<TabContainer onSelect={select} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	assert(container);

	assert(container.tabs.size === 3);
	const firstTab = ctl.find('.ui-tab').first().find('.ui-label');
	firstTab.simulate('click');
	assert(select.calledOnce);
	assert(container.tabs.size === 3);
});

test('Test removing the first item from the TabContainer', () => {
	const remove = sinon.spy();
	const ctl = mount(
		<TabContainer onRemove={remove} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	assert(container);

	assert(container.tabs.size === 3);
	const firstTab = ctl.find('.ui-tab').first().find('.ui-button');
	firstTab.simulate('click');
	assert(remove.calledOnce);
	assert(container.tabs.size === 2);

	const lastTab = ctl.find('.ui-tab').last().find('.ui-button');
	lastTab.simulate('click');
	assert(remove.calledTwice);
	assert(container.tabs.size === 1);
});

test('Test the TabContainer with the previous and next buttons', () => {
	const select = sinon.spy();
	const ctl = mount(
		<TabContainer onSelect={select} testing>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	assert(container);

	// Assert that the current tab is the first in the list
	assert.equal(ctl.state('selectedTab'), container.tabs.get(0).props['id']);

	const prevButton = ctl.find('.ui-tab-navigation').find('.ui-button').first();
	assert(prevButton);
	const nextButton = ctl.find('.ui-tab-navigation').find('.ui-button').last();
	assert(nextButton);

	// Click the "next" button and move from 1 -> 2
	nextButton.simulate('click');
	assert(select.calledOnce);
	assert.equal(ctl.state('selectedTab'), container.tabs.get(1).props['id']);

	// Click the "previous" button and move from 2 -> 1
	prevButton.simulate('click');
	assert(select.calledTwice);
	assert.equal(ctl.state('selectedTab'), container.tabs.get(0).props['id']);
});
