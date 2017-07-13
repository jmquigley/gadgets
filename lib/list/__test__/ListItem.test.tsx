'use strict';

import {mount} from 'enzyme';
import * as _ from 'lodash';
import * as React from 'react';
import * as sinon from 'sinon';
import {waitPromise} from 'util.wait';
import {Button} from '../../button';
import {getDefaultListItemProps, ListItem} from '../index';

function validate(ctl: any) {
	expect(ctl).toBeTruthy();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-listitem').length).toBe(1);
}

test('Test retrieval of ListItem props object', () => {
	const props = getDefaultListItemProps();

	expect(props).toBeTruthy();

	expect('href' in props).toBe(true);
	expect(_.isEmpty(props.href)).toBe(false);
});

test('Test the creation of a ListItem control with simple title', () => {
	const ctl = mount(
		<ListItem
			title="test title"
			selected
		/>
	);

	validate(ctl);
	expect(ctl.prop('title')).toBe('test title');
});

test('Test the creation of a ListItem control with left & right title', () => {
	const ctl = mount(
		<ListItem
			title="test title left"
			widget="test title right"
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title left');
	expect(ctl.prop('widget')).toBe('test title right');
});

test('Test disabling of a ListItem control', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ListItem
			disabled={true}
			title="test title"
			onClick={click}
		/>
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('title')).toBe('test title');
	expect(ctl.prop('disabled')).toBe(true);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-listitem').length).toBe(1);
	expect(click.notCalled).toBe(true);
});

test('Test making ListItem control invisible', () => {
	const ctl = mount(
		<ListItem title="test title" visible={false} />
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('title')).toBe('test title');
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(false);
	expect(ctl.find('.ui-listitem').length).toBe(1);
});

test('Test clicking of the left button on the ListItem control', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ListItem
			title="test title"
			leftButton={<Button iconName="bath" onClick={click} />}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-button').first().simulate('click');
	expect(click.calledOnce).toBe(true);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-bath').length).toBe(1);
});

test('Test clicking of the right button on the ListItem control', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ListItem
			title="test title"
			rightButton={<Button iconName="bath" onClick={click} />}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-button').last().simulate('click');
	expect(click.calledOnce).toBe(true);
	expect(ctl.find('.fa').length).toBe(1);
	expect(ctl.find('.fa-bath').length).toBe(1);
});

test('Test clicking of the title bar area of the ListItem', async () => {
	const click = sinon.spy();
	const ctl = mount(
		<ListItem
			title="test title"
			onClick={click}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-item').simulate('click');

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			expect(click.calledOnce).toBe(true);
		})
		.catch((err: string) => {
			console.error(err);
		});
});

test('Test double click of the title bar area of the ListItem', () => {
	const click = sinon.spy();
	const ctl = mount(
		<ListItem
			title="test title"
			onClick={click}
		/>
	);
	const listItem = ctl.instance() as ListItem;

	validate(ctl);
	expect(listItem).toBeTruthy();

	const titleCtl = ctl.find('.ui-item');
	expect(titleCtl).toBeTruthy();

	expect(listItem.preventClick).toBe(false);
	expect(ctl.prop('title')).toBe('test title');
	titleCtl.simulate('doubleClick');
	expect(listItem.preventClick).toBe(true);
	expect(ctl.state('toggleRipple')).toBe(true);

	// The single click should be ignored because the double
	// click was used.
	expect(click.notCalled).toBe(true);

	// After the double click, simulate leaving focus and reseting
	// the control.
	titleCtl.simulate('blur');
	expect(listItem.preventClick).toBe(false);
	expect(ctl.state('toggleRipple')).toBe(false);
});
