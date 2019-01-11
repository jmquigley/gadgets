'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {waitPromise} from 'util.wait';
import {Button, getDefaultListItemProps, ListItem} from '../../dist/bundle';

function validate(ctl: any) {
	expect(ctl).toBeDefined();
	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.ui-listitem').length).toBe(8);
}

test('Test retrieval of ListItem props object', () => {
	const props = getDefaultListItemProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a ListItem control with simple title', () => {
	const ctl = shallow(
		<ListItem
			title="test title"
			selected
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the creation of a ListItem control with left & right title', () => {
	const ctl = shallow(
		<ListItem
			title="test title left"
			widget="test title right"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a ListItem control', () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			disabled={true}
			onClick={click}
			title="test title"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-item').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making ListItem control invisible', () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem title="test title" visible={false} />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-item').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test clicking of the left button on the ListItem control', () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title="test title"
			leftButton={<Button iconName="bath" onClick={click} />}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-button').first().simulate('click');
	expect(click).toHaveBeenCalled();

	expect(ctl.find('.fa').length).toBe(2);
	expect(ctl.find('.fa-bath').length).toBe(2);
});

test('Test clicking of the right button on the ListItem control', () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title="test title"
			rightButton={<Button iconName="bath" onClick={click} />}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-button').last().simulate('click');
	expect(click).toHaveBeenCalled();

	expect(ctl.find('.fa').length).toBe(2);
	expect(ctl.find('.fa-bath').length).toBe(2);
});

test('Test clicking of the title bar area of the ListItem', async () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title="test title"
			onClick={click}
		/>
	);

	validate(ctl);

	expect(ctl.prop('title')).toBe('test title');
	ctl.find('.ui-label').first().simulate('click');

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			expect(click).toHaveBeenCalled();
		})
		.catch((err: string) => {
			throw new Error(string);
		});
});

test('Test double click of the title bar area of the ListItem', () => {
	const click = jest.fn();
	const ctl = mount(
		<ListItem
			title="test title"
			onClick={click}
		/>
	);
	const listItem = ctl.instance() as ListItem;

	validate(ctl);
	expect(listItem).toBeDefined();

	const titleCtl = ctl.find('.ui-label').first();
	expect(titleCtl).toBeDefined();

	expect(listItem.preventClick).toBe(false);
	expect(ctl.prop('title')).toBe('test title');
	titleCtl.simulate('doubleClick');
	expect(listItem.preventClick).toBe(true);
	expect(ctl.state('toggleRipple')).toBe(true);

	// The single click should be ignored because the double
	// click was used.
	expect(click).not.toHaveBeenCalled();

	// After the double click, simulate leaving focus and reseting
	// the control.
	titleCtl.simulate('blur');
	expect(listItem.preventClick).toBe(false);
	expect(ctl.state('toggleRipple')).toBe(false);
});
