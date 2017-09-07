'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {getDefaultTabProps, Tab} from '../index';

test('Test retrieval of Tab props object', () => {
	const props = getDefaultTabProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test the creation of a Tab instance', () => {
	const ctl = shallow(
		<Tab title="tab title" selected>Test content</Tab>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a Tab', () => {
	const click = sinon.spy();
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

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-label').simulate('click');
	assert(click.notCalled);
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

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test the click handler in the Tab instance', () => {
	const click = sinon.spy();
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

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-label').simulate('click');
	assert(click.calledOnce);
});

test('Test the close click handler on a Tab instance', () => {
	const close = sinon.spy();
	const hiddenHandler = sinon.spy();
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

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	assert(!ctl.state('hidden'));
	ctl.find('.ui-button').simulate('click');
	assert(hiddenHandler.calledOnce);
	assert(hiddenHandler.calledWith(ctl.instance()));

	assert(close.calledOnce);
	assert(close.calledWith(ctl.instance()));

	assert(ctl.state('hidden'));
});
