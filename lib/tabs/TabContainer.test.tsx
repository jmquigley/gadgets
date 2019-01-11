'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {
	getDefaultTabContainerProps,
	Location,
	Tab,
	TabContainer
} from '../../dist/bundle';

test('Test retrieval of Tabs props object', () => {
	const props = getDefaultTabContainerProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Create an empty TabContainer instance', () => {
	const ctl = mount(
		<TabContainer />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test TabContainer retrieval functions', () => {
	const ctl = mount(
		<TabContainer>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	expect(container).toBeDefined();

	const id: string = container.tabs.get(0).props['id'];
	let tab;
	let idx;

	[tab, idx] = container._getTab(id);
	expect(idx).toBe(0);
	expect(tab.props['id']).toBe(id);

	[tab, idx] = container._getTab('');
	expect(tab).toBeNull();
	expect(idx).toBe(-1);

	idx = container._getTabIdx(id);
	expect(idx).toBe(0);

	idx = container._getTabIdx('');
	expect(idx).toBe(-1);
});

test('Test the creation of a TabContainer instance (top)', () => {
	const ctl = shallow(
		<TabContainer location={Location.top}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (bottom)', () => {
	const ctl = shallow(
		<TabContainer location={Location.bottom}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (left)', () => {
	const ctl = shallow(
		<TabContainer location={Location.left}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a TabContainer instance (right)', () => {
	const ctl = shallow(
		<TabContainer location={Location.right}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling the TabContainer instance', () => {
	const ctl = mount(
		<TabContainer disabled>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making the TabContainer invisible', () => {
	const ctl = shallow(
		<TabContainer visible={false}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test selecting the first tab within the TabContainer', () => {
	const select = jest.fn();
	const ctl = mount(
		<TabContainer onSelect={select}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	expect(container).toBeDefined();

	expect(container.tabs.size).toBe(3);
	const firstTab = ctl.find('.ui-tab').first().find('.ui-label').first();
	firstTab.simulate('click');
	expect(select).toHaveBeenCalled();
	expect(container.tabs.size).toBe(3);
});

test('Test removing the first item from the TabContainer', () => {
	const remove = jest.fn();
	const ctl = mount(
		<TabContainer onRemove={remove}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	expect(container).toBeDefined();

	expect(container.tabs.size).toBe(3);
	const firstTab = ctl.find('.ui-tab').first().find('.ui-button').first();
	firstTab.simulate('click');
	expect(remove).toHaveBeenCalled();
	expect(container.tabs.size).toBe(2);

	const lastTab = ctl.find('.ui-tab').last().find('.ui-button').first();
	lastTab.simulate('click');
	expect(remove).toHaveBeenCalledTimes(2);
	expect(container.tabs.size).toBe(1);
});

test('Test the TabContainer with the previous and next buttons', () => {
	const select = jest.fn();
	const ctl = mount(
		<TabContainer onSelect={select}>
			<Tab title="tab #1">#1</Tab>
			<Tab title="tab #2">#2</Tab>
			<Tab title="tab #3">#3</Tab>
		</TabContainer>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	const container = ctl.instance() as TabContainer;
	expect(container).toBeDefined();

	// Assert that the current tab is the first in the list
	expect(ctl.state('selectedTab')).toBe(container.tabs.get(0).props['id']);

	const prevButton = ctl.find('.ui-tab-navigation').find('.ui-button').first();
	expect(prevButton).toBeDefined();
	const nextButton = ctl.find('.ui-tab-navigation').find('.ui-button').last();
	expect(nextButton).toBeDefined();

	// Click the "next" button and move from 1 -> 2
	nextButton.simulate('click');
	expect(select).toHaveBeenCalled();
	expect(ctl.state('selectedTab')).toBe(container.tabs.get(1).props['id']);

	// Click the "previous" button and move from 2 -> 1
	prevButton.simulate('click');
	expect(select).toHaveBeenCalledTimes(2);
	expect(ctl.state('selectedTab')).toBe(container.tabs.get(0).props['id']);
});
