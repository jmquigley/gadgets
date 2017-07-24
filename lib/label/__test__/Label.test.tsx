'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultLabelProps, Label} from '../index';

test('Test retrieval of default Label props object', () => {
	const props = getDefaultLabelProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Label control', () => {
	const s: string = 'Test label text';
	const ctl = shallow(<Label className="test-class" text={s} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Label control', () => {
	const click = jest.fn();
	const s: string = 'Test label text';
	const ctl = mount(<Label disabled text={s} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('span').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making the Label control invisible', () => {
	const click = jest.fn();
	const s: string = 'Test label text';
	const ctl = mount(<Label visible={false} text={s} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('span').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test a double click edit of the Label control', () => {
	const change = jest.fn();
	const dblclick = jest.fn();
	const keydown = jest.fn();
	const keypress = jest.fn();
	const update = jest.fn();
	const s: string = 'A';
	const ctl = mount(
		<Label
			focus
			onChange={change}
			onDoubleClick={dblclick}
			onKeyDown={keydown}
			onKeyPress={keypress}
			onUpdate={update}
			text={s}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const label = ctl.find('.ui-label');
	assert(label);
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	assert(ctl.state('editable'));

	label.simulate('keyDown', {key: 'B'});
	expect(keydown).toHaveBeenCalled();

	label.simulate('keyPress', {target: {innerHTML: 'ABCDE'}, key: 'Enter'});
	expect(keypress).toHaveBeenCalled();
	expect(change).toHaveBeenCalled();
	assert.equal(ctl.state('text'), 'ABCDE');
	assert(!ctl.state('editable'));

	expect(update).toHaveBeenCalled();
	assert.equal(update.mock.calls[0][0], 'A');
	assert.equal(update.mock.calls[0][1], 'ABCDE');
});

test('Test cancelling a double click edit of the Label control', () => {
	const s: string = 'A';
	const dblclick = jest.fn();
	const keydown = jest.fn();
	const keypress = jest.fn();
	const ctl = mount(
		<Label
			onDoubleClick={dblclick}
			onKeyPress={keypress}
			onKeyDown={keydown}
			text={s}
		/>
	);

	const label = ctl.find('.ui-label');
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	label.simulate('keyPress', {target: {innerHTML: 'ABCDE'}, key: 'E'});
	expect(keypress).toHaveBeenCalled();
	assert(ctl.state('editable'));

	label.simulate('keyDown', {key: 'Escape'});
	expect(keydown).toHaveBeenCalled();
	assert(!ctl.state('editable'));
	assert.equal(ctl.state('text'), s);
});

test('Test double click change to Label and blur to save', () => {
	const blur = jest.fn();
	const change = jest.fn();
	const dblclick = jest.fn();
	const update = jest.fn();
	const s: string = 'A';
	const ctl = mount(
		<Label
			focus
			onBlur={blur}
			onChange={change}
			onDoubleClick={dblclick}
			onUpdate={update}
			text={s}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	const label = ctl.find('.ui-label');
	assert(label);
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	assert(ctl.state('editable'));

	label.simulate('blur', {target: {innerHTML: 'ABCDE'}});
	expect(blur).toHaveBeenCalled();
	expect(change).toHaveBeenCalled();
	assert.equal(ctl.state('text'), 'ABCDE');
	assert(!ctl.state('editable'));

	expect(update).toHaveBeenCalled();
	assert.equal(update.mock.calls[0][0], 'A');
	assert.equal(update.mock.calls[0][1], 'ABCDE');
});

test('Test dynamically changing Label props', () => {
	const arr = ['A', 'B', 'C'];
	const ctl = mount(<Label/>);

	for (const val of arr) {

		assert(ctl);
		ctl.setProps({text: val});

		const label = ctl.instance() as Label;
		assert(label);
		assert(label.label);
		assert(ctl.state('text'), val);
	}
});
