'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultListProps, List, ListItem} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of List props object', t => {
	const props = getDefaultListProps();

	t.truthy(props);

	t.true('alternating' in props);
	t.false(props.alternating);

	t.true('onAdd' in props);
	t.true(props.onAdd != null);

	t.true('unselect' in props);
	t.false(props.unselect);
});

test('Test the creation of a List control container', t => {
	const ctl = mount(
		<List alternating className="test-class">
			<li>some list item</li>
		</List>
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-list').length, 1);
	t.is(ctl.find('.list').length, 1);
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.find('.listAlternating').length, 1);
});

test('Test disabling of a List control', t => {
	const ctl = mount(
		<List disabled={true}>
			<li>some list item</li>
		</List>
	);

	t.truthy(ctl);

	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.disabled').length, 1);
	t.is(ctl.find('.ui-list').length, 1);
	t.is(ctl.find('.list').length, 1);
});

test('Test making List control invisible', t => {
	const ctl = mount(
		<List visible={false}>
			<li>some list item</li>
		</List>
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.invisible').length, 1);
	t.is(ctl.find('.ui-list').length, 1);
	t.is(ctl.find('.list').length, 1);
});

test('Test a list with ListItem and selection', t => {
	const ctl = mount(
		<List>
			<ListItem title="Item #1" />
			<ListItem title="Item #2" />
		</List>
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-list').length, 1);
	t.is(ctl.find('.list').length, 1);

	let li1 = ctl.find(ListItem).first();
	let li2 = ctl.find(ListItem).last();
	t.is(li1.text(), "Item #1");
	t.is(li2.text(), "Item #2");
});
