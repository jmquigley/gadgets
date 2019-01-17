'use strict';

// const debug = require('debug')('Dropdown.test');

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {Dropdown, DropdownOption, getDefaultDropdownProps} from '../../dist/bundle';

const testData: DropdownOption[] = [
	{value: 'idstr1', label: 'lstr1'},
	{value: 'idstr2', label: 'lstr2'},
	{value: 'idstr3', label: 'lstr3'}
];

test('Test retrieval of Dropdown props object', () => {
	const props = getDefaultDropdownProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Creation of the Dropdown control', () => {
	const ctl = shallow(
		<Dropdown
			defaultVal="idstr2"
			items={testData}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Disable the Dropdown control', () => {
	const change = jest.fn();
	const ctl = mount(
		<Dropdown
			defaultVal="idstr2"
			disabled
			items={testData}
			onSelect={change}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
	ctl.find('.ui-dropdown').first().simulate('change', {target: {value: 'idstr2'}});
	expect(change).not.toHaveBeenCalled();
});

test('Make the Dropdown control invisible', () => {
	const change = jest.fn();
	const ctl = mount(
		<Dropdown
			defaultVal="idstr2"
			items={testData}
			onSelect={change}
			visible={false}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-dropdown').first().simulate('change', {target: {value: 'idstr2'}});
	expect(change).not.toHaveBeenCalled();
});

test('Test the Dropdown click event', () => {
	const change = jest.fn();
	const ctl = mount(
		<Dropdown
			defaultVal="idstr1"
			items={testData}
			onSelect={change}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-dropdown').first().simulate('change', {target: {value: 'idstr1'}});
	expect(change).toHaveBeenCalled();
	expect(change.mock.calls[0][0]).toBe('idstr1');
});
