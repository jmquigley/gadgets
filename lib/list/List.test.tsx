'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {waitPromise} from 'util.wait';
import {getDefaultListProps, List, ListItem} from './index';

test('Test retrieval of List props object', () => {
	const props = getDefaultListProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a List control container', () => {
	const ctl = shallow(
		<List alternating className="test-class">
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a List control', () => {
	const ctl = shallow(
		<List disabled={true} >
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making List control invisible', () => {
	const ctl = shallow(
		<List visible={false}>
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test a list with ListItem and selection', () => {
	const ctl = mount(
		<List>
			<ListItem title="Item #1" />
			<ListItem title="Item #2" />
		</List>
	);

	expect(ctl).toBeDefined();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-list').length).toBe(3);

	const li1 = ctl.find(ListItem).first();
	const li2 = ctl.find(ListItem).last();

	expect(li1.text()).toBe('Item #1');
	expect(li2.text()).toBe('Item #2');
});

test('Test the onSelect handler within a list', async () => {
	const select = jest.fn();
	const ctl = mount(
		<List
			onSelect={select}
		>
			<ListItem title="Item #1" />
			<ListItem title="Item #2" />
		</List>
	);

	expect(ctl).toBeDefined();
	ctl.find('.ui-listitem').first().find('.ui-label').first().simulate('click');

	// When the item is clicked it is not selected immediately.  There is a wait
	// handler within ListItem that attempts to detect double clicks.  This means
	// We must want N seconds before safely checking that the item was clicked
	// and that the onSelect callback was invoked.

	await waitPromise(2)
		.then(() => {
			expect(select).toHaveBeenCalled();
			expect(select).toHaveBeenCalledWith('Item #1');
		})
		.catch((err: string) => {
			expect(err).toBeNull();
		});
});
