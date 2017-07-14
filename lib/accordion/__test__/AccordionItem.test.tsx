'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {AccordionItem} from '../index';

test('Test the creation of a AccordionItem control', () => {
	const ctl = shallow(
		<AccordionItem className="test-class" title="Test Title" />
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

	ctl.find('.ui-title-bar').simulate('click');
	expect(click).toHaveBeenCalled();
});

test('Test clicking the AccordionItem new button', () => {
	const click = jest.fn();
	const ctl = mount(
		<AccordionItem title="Test Title" onNew={click} />
	);

	assert(ctl);

	const btn = ctl.find('.ui-button');
	expect(btn.length).toBe(1);

	btn.simulate('click');
	expect(click).toHaveBeenCalled();
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
