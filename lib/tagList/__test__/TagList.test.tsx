'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {getDefaultTagListProps, TagList} from '../index';

test('Test retrieval of TagList props object', () => {
	const props = getDefaultTagListProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple TagList instance', () => {
	const ctl = shallow(
		<TagList />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Create a new static TagList with 3 tags (a, b, c)', () => {
	const ctl = mount(
		<TagList tags={['a', 'b', 'c']} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert.deepEqual(ctl.state('tags'), ['a', 'b', 'c']);
});

test('Create a new static TagList with 3 tags (c, b, a) with no sorting', () => {
	const ctl = mount(
		<TagList nosort tags={['c', 'b', 'a']} />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
	assert.deepEqual(ctl.state('tags'), ['c', 'b', 'a']);
});

test('Create a new dynamic TagList by adding a new input', () => {
	const keypress = sinon.spy();
	const onnew = sinon.spy();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={['c', 'b', 'd']}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	assert(input);

	assert.deepEqual(ctl.state('tags'), ['b', 'c', 'd']);
	input.simulate('keyPress', {key: 'Enter', target: {value: 'a'}});
	assert(keypress.calledOnce);
	assert(onnew.calledOnce);
	assert(onnew.calledWith('a'));
	assert.deepEqual(ctl.state('tags'), ['a', 'b', 'c', 'd']);
});

test('Try to create a duplicate entry within a dynamic TagList', () => {
	const keypress = sinon.spy();
	const onnew = sinon.spy();
	const ctl = mount(
		<TagList
			onKeyPress={keypress}
			onNew={onnew}
			tags={['c', 'b', 'd']}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	assert(input);

	assert.deepEqual(ctl.state('tags'), ['b', 'c', 'd']);
	input.simulate('keyPress', {key: 'Enter', target: {value: 'd'}});
	assert(keypress.calledOnce);
	assert(!onnew.calledOnce);
	assert.deepEqual(ctl.state('tags'), ['b', 'c', 'd']);
});

test('Create a new dynamic TagList item and cancel creation with escape', () => {
	const keydown = sinon.spy();
	const ctl = mount(
		<TagList
			onKeyDown={keydown}
			tags={['a', 'b', 'c']}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	assert(input);

	assert.deepEqual(ctl.state('tags'), ['a', 'b', 'c']);
	input.simulate('keyDown', {key: 'Escape'});
	assert(keydown.calledOnce);
	assert.deepEqual(ctl.state('tags'), ['a', 'b', 'c']);
});

test('Remove a tag from a TagList', () => {
	const ondelete = sinon.spy();
	const ctl = mount(
		<TagList
			onDelete={ondelete}
			tags={['a', 'b', 'c']}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert.deepEqual(ctl.state('tags'), ['a', 'b', 'c']);
	assert(ctl.find('.ui-button-circle').length === 6);

	const btns = ctl.find('.ui-button');
	assert(btns.length === 6);

	// show the delete button that will be clicked
	ctl.find('.ui-tag').at(0).simulate('mouseOver');
	btns.at(0).simulate('click');
	assert(ondelete.calledOnce);
	assert(ondelete.calledWith('a'));
	assert.deepEqual(ctl.state('tags'), ['b', 'c']);
});

test('Test the change/blur events in TagList', () => {
	const blur = sinon.spy();
	const change = sinon.spy();
	const ctl = mount(
		<TagList
			onChange={change}
			onBlur={blur}
			useinput
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const input = ctl.find('input');
	assert(input);

	input.simulate('change', {target: {value: 'abc'}});
	assert(ctl.state('inputTextSize') === 3);

	input.simulate('blur', {target: {value: 'abc'}});
	assert(ctl.state('inputTextSize') === 1);
});
