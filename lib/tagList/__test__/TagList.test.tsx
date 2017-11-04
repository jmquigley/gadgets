'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTagListProps, TagList} from '../index';

test('Test retrieval of TagList props object', () => {
	const props = getDefaultTagListProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple TagList instance', () => {
	const ctl = shallow(
		<TagList />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Create a new static TagList with 3 tags (a, b, c)', () => {
	const ctl = mount(
		<TagList tags={['a', 'b', 'c']} />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['a', 'b', 'c']));
});

test('Create a new static TagList with 3 tags (c, b, a) with no sorting', () => {
	const ctl = mount(
		<TagList nosort tags={['c', 'b', 'a']} />
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['c', 'b', 'a']));
});

test('Create a new dynamic TagList by adding a new input', () => {
	const keypress = jest.fn();
	const onnew = jest.fn();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={['c', 'b', 'd']}
			useinput
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	expect(input).toBeTruthy();

	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['b', 'c', 'd']));

	input.simulate('keyPress', {key: 'Enter', target: {value: 'a'}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalled();
	expect(onnew).toHaveBeenCalledWith('a');

	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['a', 'b', 'c', 'd']));
});

test('Try to create a duplicate entry within a dynamic TagList', () => {
	const keypress = jest.fn();
	const onnew = jest.fn();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={['c', 'b', 'd']}
			useinput
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	expect(input).toBeTruthy();

	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['b', 'c', 'd']));
	input.simulate('keyPress', {key: 'Enter', target: {value: 'd'}});

	expect(keypress).toHaveBeenCalled();
	expect(onnew).not.toHaveBeenCalled();
	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['b', 'c', 'd']));
});

test('Create a new dynamic TagList item and cancel creation with escape', () => {
	const keydown = jest.fn();
	const ctl = mount(
		<TagList
			onKeyDown={keydown}
			tags={['a', 'b', 'c']}
			useinput
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	expect(input).toBeTruthy();

	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['a', 'b', 'c']));
	input.simulate('keyDown', {key: 'Escape'});
	expect(keydown).toHaveBeenCalled();
	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['a', 'b', 'c']));
});

test('Remove a tag from a TagList', () => {
	const ondelete = jest.fn();
	const ctl = mount(
		<TagList
			onDelete={ondelete}
			tags={['a', 'b', 'c']}
			useinput
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['a', 'b', 'c']));
	expect(ctl.find('.ui-button-circle').length).toBe(6);

	const btns = ctl.find('.ui-button');
	expect(btns.length).toBe(6);

	// show the delete button that will be clicked
	ctl.find('.ui-tag').at(0).simulate('mouseOver');
	btns.at(0).simulate('click');

	expect(ondelete).toHaveBeenCalled();
	expect(ondelete).toHaveBeenCalledWith('a');
	expect(ctl.state('tags')).toEqual(expect.arrayContaining(['b', 'c']));
});

test('Test the change/blur events in TagList', () => {
	const blur = jest.fn();
	const change = jest.fn();
	const ctl = mount(
		<TagList
			onChange={change}
			onBlur={blur}
			useinput
		/>
	);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	expect(input).toBeTruthy();

	input.simulate('change', {target: {value: 'abc'}});
	expect(ctl.state('inputTextSize')).toBe(3);

	input.simulate('blur', {target: {value: 'abc'}});
	expect(ctl.state('inputTextSize')).toBe(1);
});
