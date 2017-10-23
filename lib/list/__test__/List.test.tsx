'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultListProps, List, ListItem} from '../index';

test('Test retrieval of List props object', () => {
	const props = getDefaultListProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a List control container', () => {
	const ctl = shallow(
		<List alternating className="test-class" testing>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a List control', () => {
	const ctl = shallow(
		<List disabled={true} testing>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making List control invisible', () => {
	const ctl = shallow(
		<List visible={false} testing>
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test a list with ListItem and selection', () => {
	const ctl = mount(
		<List testing>
			<ListItem title="Item #1" />
			<ListItem title="Item #2" />
		</List>
	);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.ui-list').length, 1);

	const li1 = ctl.find(ListItem).first();
	const li2 = ctl.find(ListItem).last();
	assert.equal(li1.text(), 'Item #1');
	assert.equal(li2.text(), 'Item #2');
});
