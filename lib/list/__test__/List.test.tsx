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
		<List alternating className="test-class">
			<li>some list item</li>
		</List>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a List control', () => {
	const ctl = mount(
		<List disabled={true}>
			<li>some list item</li>
		</List>
	);

	assert(ctl);

	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.disabled').length, 1);
	assert.equal(ctl.find('.ui-list').length, 1);
});

test('Test making List control invisible', () => {
	const ctl = mount(
		<List visible={false}>
			<li>some list item</li>
		</List>
	);

	assert(ctl);

	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.invisible').length, 1);
	assert.equal(ctl.find('.ui-list').length, 1);
});

test('Test a list with ListItem and selection', () => {
	const ctl = mount(
		<List>
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
