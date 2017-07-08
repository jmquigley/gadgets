'use strict';

import {cleanup, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {Pager, getDefaultPagerProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

function validate(ctl: any, t: any) {
	t.truthy(ctl);
	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-pager').length, 1);
}

test('Test retrieval of Pager props object', t => {
	const props = getDefaultPagerProps();

	t.truthy(props);

	t.true('pagesToDisplay' in props);
	t.is(props.pagesToDisplay, 3);

	t.true('pageSizes' in props);
	t.deepEqual(props.pageSizes, [25, 50, 100]);

	t.true('totalItems' in props);
	t.is(props.totalItems, 0);
});

test('Test creation of a Pager control', t => {
	const ctl = mount(<Pager className="test-class" />);

	validate(ctl, t);
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.prop('initialPage'), 1);
});

test('Test pager getPages method with front of list', t => {
	const ctl = mount(
		<Pager
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test pager getPages method with 2nd to last in list', t => {
	const ctl = mount(
		<Pager
			initialPage={11}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [10,11,12]);
	t.is(pager.currentPage, 11);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test Pager getPages method with last in the List', t => {
	const ctl = mount(
		<Pager
			initialPage={12}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [10,11,12]);
	t.is(pager.currentPage, 12);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test Pager getPages method with invalid initial page (negative test)', t => {
	const ctl = mount(
		<Pager
			initialPage={-1}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test Pager getPages method with invalid pageSizes (negative test)', t => {
	const ctl = mount(
		<Pager
			pageSizes={null}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(ctl.state('pageSize'), 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test Pager getPages method with empty pageSizes (negative test)', t => {
	const ctl = mount(
		<Pager
			pageSizes={[]}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test Pager getPages method with invalid totalItems (negative test)', t => {
	const ctl = mount(
		<Pager
			pageSizes={[]}
			totalItems={0}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.truthy(pager);
	t.deepEqual(pager.pages, [1,0,0]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 1);
	t.is(pager.state.pageSize, 25);
	t.true(pager.state.pageSize === pager.pageSize);
});

test('Test selection of the second page in the control', t => {
	const select = sinon.spy();
	const ctl = mount(
		<Pager
			onSelect={select}
			pageSizes={[10,25,100]}
			totalItems={3000}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	// Number of button controls in this instance
	t.is(ctl.find('.ui-button').length, 5);
	t.is(ctl.find('.ui-button-text').length, 3);
	t.is(ctl.find('.ui-button-dialog').length, 1);

	// Click the second page number.  Can't click the first one because
	// it is already selected by default when the control is created
	ctl.find('.ui-button-text').at(1).simulate('click');
	t.true(select.calledOnce);
	t.true(select.calledWith(2));
});

test('Test pressing the "<<" (first) button', t => {
	const select = sinon.spy();
	const ctl = mount(
		<Pager
			initialPage={2}
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.is(pager.currentPage, 2);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);

	// Number of button controls in this instance
	t.is(ctl.find('.ui-button').length, 5);
	t.is(ctl.find('.ui-button-text').length, 3);
	t.is(ctl.find('.ui-button-dialog').length, 1);

	// Select the first button "<<" move from 2 -> 1
	ctl.find('.ui-button').at(0).simulate('click');
	t.true(select.calledOnce);
	t.true(select.calledWith(1));
});

test('Test pressing the "<" (previous) button', t => {
	const select = sinon.spy();
	const ctl = mount(
		<Pager
			initialPage={3}
			onSelect={select}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.is(pager.currentPage, 3);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);

	// Number of button controls in this instance
	t.is(ctl.find('.ui-button').length, 5);
	t.is(ctl.find('.ui-button-text').length, 3);
	t.is(ctl.find('.ui-button-dialog').length, 1);

	// Select the first button "<" move from 3 -> 2
	ctl.find('.ui-button').at(1).simulate('click');
	t.true(select.calledOnce);
	t.true(select.calledWith(2));
});

test('Test pressing the ">" (next) button', t => {
	const select = sinon.spy();
	const ctl = mount(
		<Pager
			onSelect={select}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);

	// Number of button controls in this instance
	t.is(ctl.find('.ui-button').length, 5);
	t.is(ctl.find('.ui-button-text').length, 3);
	t.is(ctl.find('.ui-button-dialog').length, 1);

	// Select the third button ">", move from 1 -> 2
	ctl.find('.ui-button').at(2).simulate('click');
	t.true(select.calledOnce);
	t.true(select.calledWith(2));
});

test('Test pressing the ">>" (last) button', t => {
	const select = sinon.spy();
	const ctl = mount(
		<Pager
			onSelect={select}
			totalItems={299}
			/>
	);

	validate(ctl, t);
	const pager = ctl.instance() as Pager;
	t.truthy(pager);

	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
	t.is(pager.state.pageSize, 25);

	// Number of button controls in this instance
	t.is(ctl.find('.ui-button').length, 5);
	t.is(ctl.find('.ui-button-text').length, 3);
	t.is(ctl.find('.ui-button-dialog').length, 1);

	// Select the fourth button ">>", move from 1 -> 12
	ctl.find('.ui-button').at(3).simulate('click');
	t.true(select.calledOnce);
	t.true(select.calledWith(12));
});
