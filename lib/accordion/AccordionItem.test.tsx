'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {AccordionItem, getDefaultAccordionItemProps} from '../../dist/bundle';

test('Test retrieval of AccordionItem props object', () => {
	const props = getDefaultAccordionItemProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test the creation of a AccordionItem control', () => {
	const ctl = shallow(
		<AccordionItem className="test-class" title="Test Title" />
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the AccordionItem', () => {
	const ctl = shallow(
		<AccordionItem
			disabled
			title="Test Title"
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test making the AccordionItem invisible', () => {
	const ctl = shallow(
		<AccordionItem
			title="Test Title"
			visible={false}
		/>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test clicking of the AccordionItem header', () => {
	const click = jest.fn();
	const child = <div>child content</div>;
	const ctl = mount(
		<AccordionItem
			initialToggle={false}
			onClick={click}
			title="Test Title"
		>
			{child}
		</AccordionItem>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	expect(ctl.state('toggle')).toBe(false);
	expect(ctl.contains(child)).toBe(false);
	ctl.find('.ui-label').first().simulate('click');
	expect(click).toHaveBeenCalled();
	expect(ctl.state('toggle')).toBe(true);
	expect(ctl.contains(child)).toBe(true);
});

test('Test clicking the AccordionItem header when setting nocollapse', () => {
	const click = jest.fn();
	const child = <div>child content</div>;
	const ctl = mount(
		<AccordionItem
			initialToggle={false}
			nocollapse
			onClick={click}
			title="Test Title"
		>
			{child}
		</AccordionItem>
	);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	expect(ctl.state('toggle')).toBe(false);
	expect(ctl.contains(child)).toBe(false);
	ctl.find('.ui-label').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
	expect(ctl.state('toggle')).toBe(false);
	expect(ctl.contains(child)).toBe(false);
});
