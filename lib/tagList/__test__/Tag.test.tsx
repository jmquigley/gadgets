'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTagProps, Tag} from '../index';

test('Test retrieval of Tag props object', () => {
	const props = getDefaultTagProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple Tag instance', () => {
	const ctl = shallow(
		<Tag>test tag</Tag>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the simple Tag instance', () => {
	const click = jest.fn();
	const ctl = mount(
		<Tag disabled onClick={click} usedelete>test tag</Tag>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making Tag invisible', () => {
	const ctl = mount(
		<Tag disabled usedelete visible={false}>test tag</Tag>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test hiding/showing the delete button in Tag', () => {
	const tag: string = 'test tag';
	const ondelete = jest.fn();
	const ctl = mount(
		<Tag
			onDelete={ondelete}
			usedelete
		>
			{tag}
		</Tag>
	);

	expect(ctl).toBeTruthy();
	ctl.find('.ui-tag').simulate('mouseOver');
	expect(ctl.state('showDelete')).toBe(true);
	ctl.find('.ui-button').first().simulate('click');
	expect(ondelete).toHaveBeenCalled();
	expect(ondelete).toHaveBeenCalledWith(tag);
});

test('Test the mouseout event to hide the Tag delete button', () => {
	const tag: string = 'test tag';
	const ctl = mount(
		<Tag
			usedelete
		>
			{tag}
		</Tag>
	);

	expect(ctl).toBeTruthy();
	ctl.find('.ui-tag').simulate('mouseOver');
	expect(ctl.state('showDelete')).toBe(true);
	ctl.find('.ui-tag').simulate('mouseOut');
	expect(ctl.state('showDelete')).toBe(false);
});
