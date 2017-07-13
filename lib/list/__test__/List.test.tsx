'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultListProps, List, ListItem} from '../index';

test('Test retrieval of List props object', () => {
	const props = getDefaultListProps();

	expect(props).toBeTruthy();

	expect('alternating' in props).toBe(true);
	expect(props.alternating).toBe(false);

	expect('onAdd' in props).toBe(true);
	expect(props.onAdd).not.toBeNull();

	expect('unselect' in props).toBe(true);
	expect(props.unselect).toBe(false);
});

test('Test the creation of a List control container', () => {
	const ctl = mount(
		<List alternating className="test-class">
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('alternating')).toBe(true);
	expect(ctl.find('.ui-list').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
});

test('Test disabling of a List control', () => {
	const ctl = mount(
		<List disabled={true}>
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-list').length).toBe(1);
});

test('Test making List control invisible', () => {
	const ctl = mount(
		<List visible={false}>
			<li>some list item</li>
		</List>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
	expect(ctl.find('.ui-list').length).toBe(1);
});

test('Test a list with ListItem and selection', () => {
	const ctl = mount(
		<List>
			<ListItem title="Item #1" />
			<ListItem title="Item #2" />
		</List>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-list').length).toBe(1);

	const li1 = ctl.find(ListItem).first();
	const li2 = ctl.find(ListItem).last();
	expect(li1.text()).toBe('Item #1');
	expect(li2.text()).toBe('Item #2');
});
