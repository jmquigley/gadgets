'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {getDefaultTagProps, Tag} from '../index';

test('Test retrieval of Tag props object', () => {
	const props = getDefaultTagProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a simple Tag instance', () => {
	const ctl = shallow(
		<Tag>test tag</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of the simple Tag instance', () => {
	const click = sinon.spy();
	const ctl = mount(
		<Tag disabled onClick={click} usedelete>test tag</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	assert(!click.calledOnce);
});

test('Test making Tag invisible', () => {
	const ctl = mount(
		<Tag disabled usedelete visible={false}>test tag</Tag>
	);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test hiding/showing the delete button in Tag', () => {
	const tag: string = 'test tag';
	const ondelete = sinon.spy();
	const ctl = mount(
		<Tag
			onDelete={ondelete}
			usedelete
		>
			{tag}
		</Tag>
	);

	assert(ctl);
	ctl.find('.ui-tag').simulate('mouseOver');
	assert(ctl.state('showDelete'));
	ctl.find('.ui-button').simulate('click');
	assert(ondelete.calledOnce);
	assert(ondelete.calledWith(tag));
});

test('Test the mouseout event to hide the Tag delete button', () => {
	const tag: string = 'test tag';
	const ctl = mount(
		<Tag
			usedelete
		>
			{tag}
		</Tag>
	);

	assert(ctl);
	ctl.find('.ui-tag').simulate('mouseOver');
	assert(ctl.state('showDelete'));
	ctl.find('.ui-tag').simulate('mouseOut');
	assert(!ctl.state('showDelete'));
});
