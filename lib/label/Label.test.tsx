'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultLabelProps, Label} from '../../dist/bundle';

test('Test retrieval of default Label props object', () => {
	const props = getDefaultLabelProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Label control', () => {
	const s: string = 'Test label text';
	const ctl = shallow(<Label className="test-class" text={s} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the Label control', () => {
	const click = jest.fn();
	const s: string = 'Test label text';
	const ctl = mount(<Label disabled text={s} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('span').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making the Label control invisible', () => {
	const click = jest.fn();
	const s: string = 'Test label text';
	const ctl = mount(<Label visible={false} text={s} />);

	expect(ctl).toBeDefined();
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

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	const label = ctl.find('.ui-label').first();
	expect(label).toBeDefined();
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	expect(ctl.state('editable')).toBe(true);

	label.simulate('keyDown', {key: 'B'});
	expect(keydown).toHaveBeenCalled();

	label.simulate('keyPress', {target: {innerHTML: 'ABCDE'}, key: 'Enter'});
	expect(keypress).toHaveBeenCalled();
	expect(change).toHaveBeenCalled();
	expect(ctl.state('text')).toBe('ABCDE');
	expect(!ctl.state('editable')).toBe(true);

	expect(update).toHaveBeenCalled();
	expect(update.mock.calls[0][0]).toBe('A');
	expect(update.mock.calls[0][1]).toBe('ABCDE');
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

	const label = ctl.find('.ui-label').first();
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	label.simulate('keyPress', {target: {innerHTML: 'ABCDE'}, key: 'E'});
	expect(keypress).toHaveBeenCalled();
	expect(ctl.state('editable')).toBe(true);

	label.simulate('keyDown', {key: 'Escape'});
	expect(keydown).toHaveBeenCalled();
	expect(!ctl.state('editable')).toBe(true);
	expect(ctl.state('text')).toBe(s);
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

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	const label = ctl.find('.ui-label').first();
	expect(label).toBeDefined();
	label.simulate('doubleClick');
	expect(dblclick).toHaveBeenCalled();

	expect(ctl.state('editable')).toBe(true);

	label.simulate('blur', {target: {innerHTML: 'ABCDE'}});
	expect(blur).toHaveBeenCalled();
	expect(change).toHaveBeenCalled();
	expect(ctl.state('text')).toBe('ABCDE');
	expect(!ctl.state('editable')).toBe(true);

	expect(update).toHaveBeenCalled();
	expect(update.mock.calls[0][0]).toBe('A');
	expect(update.mock.calls[0][1]).toBe('ABCDE');
});

test('Test dynamically changing Label props', () => {
	const arr = ['A', 'B', 'C'];
	const ctl = mount(<Label/>);

	for (const val of arr) {

		expect(ctl).toBeDefined();
		ctl.setProps({text: val});

		const instance = ctl.instance() as Label;
		expect(instance).toBeDefined();
		expect(instance.label).toBeDefined();
		expect(ctl.state('text')).toBe(val);
	}
});
