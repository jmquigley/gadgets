'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {AccordionItem} from '../index';

test('Test the creation of a AccordionItem control', () => {
	const ctl = mount(
		<AccordionItem className="test-class" title="Test Title" />
	);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.prop('title')).toBe('Test Title');

	expect(ctl.find('.ui-accordionitem').length).toBe(1);
	expect(ctl.find('.test-class').length).toBe(1);
});

test('Test clicking of the AccordionItem header', () => {
	const click = sinon.spy();
	const ctl = mount(
		<AccordionItem title="Test Title" onClick={click} />
	);

	expect(ctl).toBeTruthy();

	ctl.find('.ui-title-bar').simulate('click');
	expect(click.calledOnce).toBe(true);
});

test('Test clicking the AccordionItem new button', () => {
	const click = sinon.spy();
	const ctl = mount(
		<AccordionItem title="Test Title" onNew={click} />
	);

	expect(ctl).toBeTruthy();

	const btn = ctl.find('.ui-button');
	expect(btn.length).toBe(1);

	btn.simulate('click');
	expect(click.calledOnce).toBe(true);
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
