'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultTabProps, Tab} from '../../dist/bundle';

test('Test retrieval of Tab props object', () => {
	const props = getDefaultTabProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a Tab instance', () => {
	const ctl = shallow(
		<Tab title="tab title" selected>Test content</Tab>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Tab', () => {
	const click = jest.fn();
	const ctl = mount(
		<Tab
			disabled={true}
			href={{
				selectHandler: click
			}}
			title="tab title"
		>
			Test content
		</Tab>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-label').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a Tab invisible', () => {
	const ctl = mount(
		<Tab
			title="tab title"
			visible={false}
		>
		Test content
		</Tab>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the click handler in the Tab instance', () => {
	const click = jest.fn();
	const ctl = mount(
		<Tab
			href={{
				selectHandler: click
			}}
			title="tab title"
		>
			Test content
		</Tab>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-label').first().simulate('click');
	expect(click).toHaveBeenCalled();
});

test('Test the close click handler on a Tab instance', () => {
	const close = jest.fn();
	const hiddenHandler = jest.fn();
	const ctl = mount(
		<Tab
			href={{
				hiddenTabHandler: hiddenHandler
			}}
			onClose={close}
			title="tab title"
		>
			Test content
		</Tab>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	expect(ctl.state('hidden')).toBe(false);
	ctl.find('.ui-button').first().simulate('click');

	expect(hiddenHandler).toHaveBeenCalled();
	expect(hiddenHandler).toHaveBeenCalledWith(ctl.instance());

	expect(close).toHaveBeenCalled();
	expect(close).toHaveBeenCalledWith(ctl.instance());

	expect(ctl.state('hidden')).toBe(true);
});
