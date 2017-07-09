'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as _ from 'lodash';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {waitPromise} from 'util.wait';
import {getDefaultListItemProps, ListItem} from './index';
import {Button} from '../button';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

function validate(ctl: any, t: any) {
	t.truthy(ctl);
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-listitem').length, 1);
	t.is(ctl.find('.listItem').length, 1);
}

test('Test retrieval of ListItem props object', t => {
	const props = getDefaultListItemProps();

	t.truthy(props);

	t.true('href' in props);
	t.false(_.isEmpty(props.href));
});

test('Test the creation of a ListItem control with simple title', t => {
	const ctl = mount(
		<ListItem
			title="test title"
			selected
			/>
	);

	validate(ctl, t);
	t.is(ctl.prop('title'), 'test title');
});

test('Test the creation of a ListItem control with left & right title', t => {
 	const ctl = mount(
 		<ListItem
			title="test title left"
			widget="test title right"
			/>
 	);

	validate(ctl, t);

 	t.is(ctl.prop('title'), 'test title left');
 	t.is(ctl.prop('widget'), 'test title right');
 });

test('Test disabling of a ListItem control', t => {
	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			disabled={true}
			title="test title"
			onClick={click}
			/>
 	);

 	t.truthy(ctl);

 	t.is(ctl.prop('title'), 'test title');
 	t.true(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.disabled').length, 2);
 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
	t.true(click.notCalled);
});

test('Test making ListItem control invisible', t => {
 	const ctl = mount(
 		<ListItem title="test title" visible={false} />
 	);

 	t.truthy(ctl);

 	t.is(ctl.prop('title'), 'test title');
 	t.false(ctl.prop('disabled'));
 	t.false(ctl.prop('visible'));
 	t.is(ctl.find('.invisible').length, 2);
 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
});

test('Test clicking of the left button on the ListItem control', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			title="test title"
			leftButton={<Button iconName="bath" onClick={click} />}
			/>
 	);

	validate(ctl, t);

 	t.is(ctl.prop('title'), 'test title');
 	ctl.find('.ui-button').first().simulate('click');
 	t.true(click.calledOnce);
 	t.is(ctl.find('.fa').length, 1);
 	t.is(ctl.find('.fa-bath').length, 1);
});

test('Test clicking of the right button on the ListItem control', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			title="test title"
			rightButton={<Button iconName="bath" onClick={click} />}
			/>
 	);

	validate(ctl, t);

 	t.is(ctl.prop('title'), 'test title');
 	ctl.find('.ui-button').last().simulate('click');
 	t.true(click.calledOnce);
 	t.is(ctl.find('.fa').length, 1);
 	t.is(ctl.find('.fa-bath').length, 1);
});

test('Test clicking of the title bar area of the ListItem', async t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			title="test title"
			onClick={click}
			/>
 	);

	validate(ctl, t);

 	t.is(ctl.prop('title'), 'test title');
 	ctl.find('.ui-item').simulate('click');

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			t.true(click.calledOnce);
		})
		.catch((err: string) => {
			t.fail(err);
		});
});

test('Test double click of the title bar area of the ListItem', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			title="test title"
			onClick={click}
			/>
 	);
	const listItem = ctl.instance() as ListItem;

	validate(ctl, t);
	t.truthy(listItem);

	let titleCtl = ctl.find('.ui-item');
	t.truthy(titleCtl);

	t.false(listItem.preventClick);
	t.is(ctl.prop('title'), 'test title');
	titleCtl.simulate('doubleClick');
	t.true(listItem.preventClick);
	t.true(ctl.state('toggleRipple'));

	// The single click should be ignored because the double
	// click was used.
	t.true(click.notCalled);

	// After the double click, simulate leaving focus and reseting
	// the control.
	titleCtl.simulate('blur');
	t.false(listItem.preventClick);
	t.false(ctl.state('toggleRipple'));
});
