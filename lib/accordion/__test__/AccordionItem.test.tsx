'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {AccordionItem, getDefaultAccordionItemProps} from '../index';

test('Test retrieval of AccordionItem props object', () => {
	const props = getDefaultAccordionItemProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a AccordionItem control', () => {
	const ctl = shallow(
		<AccordionItem className="test-class" title="Test Title" />
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the disabling of the AccordionItem', () => {
	const ctl = shallow(
		<AccordionItem
			disabled
			title="Test Title"
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test making the AccordionItem invisible', () => {
	const ctl = shallow(
		<AccordionItem
			title="Test Title"
			visible={false}
		/>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test clicking of the AccordionItem header', () => {
	const click = jest.fn();
	const ctl = mount(
		<AccordionItem title="Test Title" onClick={click} />
	);

	assert(ctl);

	ctl.find('.ui-label').simulate('click');
	expect(click).toHaveBeenCalled();
});
