'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {AccordionItem} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test the creation of a AccordionItem control', t => {
	const ctl = mount(
		<AccordionItem className="test-class" title="Test Title" />
	);

	t.truthy(ctl);

	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.prop('title'), 'Test Title');

	t.is(ctl.find('.ui-accordionitem').length, 1);
	t.is(ctl.find('.accordionItem').length, 1);
	t.is(ctl.find('.test-class').length, 1);
});

test('Test clicking of the AccordionItem header', t => {
	const click = sinon.spy();
	const ctl = mount(
		<AccordionItem title="Test Title" onClick={click} />
	);

	t.truthy(ctl);

	ctl.find('.ui-title-bar').simulate('click');
	t.true(click.calledOnce);
});

test('Test clicking the AccordionItem new button', t => {
	const click = sinon.spy();
	const ctl = mount(
		<AccordionItem title="Test Title" onNew={click} />
	);

	t.truthy(ctl);

	let btn = ctl.find('.ui-button');
	t.is(btn.length, 1);

	btn.simulate('click');
	t.true(click.calledOnce);
});

// TODO: test case for validating props object creator
// TODO: disabling the accordion item
// TODO: make the accordion item invisible
