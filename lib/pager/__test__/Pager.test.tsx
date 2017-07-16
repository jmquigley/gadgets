'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {waitPromise} from 'util.wait';
import {getDefaultPagerProps, Pager} from '../index';

function validate(ctl: any) {
	assert(ctl);
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.ui-pager').length, 1);
}

test('Test retrieval of Pager props object', () => {
	const props = getDefaultPagerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a Pager control', () => {
	const ctl = shallow(<Pager className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test pager getPages method with front of list', () => {
	const ctl = mount(
		<Pager
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [1, 2, 3]);
	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test pager getPages method with 2nd to last in list', () => {
	const ctl = mount(
		<Pager
			initialPage={11}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [10, 11, 12]);
	assert.equal(pager.currentPage, 11);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test Pager getPages method with last in the List', () => {
	const ctl = mount(
		<Pager
			initialPage={12}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [10, 11, 12]);
	assert.equal(pager.currentPage, 12);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test Pager getPages method with invalid initial page (negative test)', () => {
	const ctl = mount(
		<Pager
			initialPage={-1}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [1, 2, 3]);
	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test Pager getPages method with invalid pageSizes (negative test)', () => {
	const ctl = mount(
		<Pager
			pageSizes={null}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [1, 2, 3]);
	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(ctl.state('pageSize'), 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test Pager getPages method with empty pageSizes (negative test)', () => {
	const ctl = mount(
		<Pager
			pageSizes={[]}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [1, 2, 3]);
	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test Pager getPages method with invalid totalItems (negative test)', () => {
	const ctl = mount(
		<Pager
			pageSizes={[]}
			totalItems={0}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.deepEqual(pager.pages, [1, 0, 0]);
	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 1);
	assert.equal(pager.state.pageSize, 25);
	assert.equal(pager.state.pageSize, pager.pageSize);
});

test('Test selection of the second page in the control', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			onSelect={select}
			pageSizes={[10, 25, 100]}
			totalItems={3000}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);

	// Click the second page number.  Can't click the first one because
	// it is already selected by default when the control is created
	ctl.find('.ui-button-text').at(1).simulate('click');
	expect(select).toHaveBeenCalled();
	assert.equal(select.mock.calls[0][0], 2);
});

test('Test pressing the "<<" (first) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			initialPage={2}
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.equal(pager.currentPage, 2);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);

	// Select the first button "<<" move from 2 -> 1
	ctl.find('.ui-button').at(0).simulate('click');
	expect(select).toHaveBeenCalled();
	assert.equal(select.mock.calls[0][0], 1);
});

test('Test pressing the "<" (previous) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			initialPage={3}
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.equal(pager.currentPage, 3);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);

	// Select the first button "<" move from 3 -> 2
	ctl.find('.ui-button').at(1).simulate('click');
	expect(select).toHaveBeenCalled();
	assert.equal(select.mock.calls[0][0], 2);
});

test('Test pressing the ">" (next) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);

	// Select the third button ">", move from 1 -> 2
	ctl.find('.ui-button').at(2).simulate('click');
	expect(select).toHaveBeenCalled();
	assert.equal(select.mock.calls[0][0], 2);
});

test('Test pressing the ">>" (last) button', () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);

	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);

	// Select the fourth button ">>", move from 1 -> 12
	ctl.find('.ui-button').at(3).simulate('click');
	expect(select).toHaveBeenCalled();
	assert.equal(select.mock.calls[0][0], 12);
});

test('Test selecting dialog "50" to change the page size', async () => {
	const select = jest.fn();
	const ctl = mount(
		<Pager
			onSelect={select}
			totalItems={299}
		/>
	);

	validate(ctl);
	const pager = ctl.instance() as Pager;
	assert(pager);
	assert(pager.dialog);

	assert.equal(pager.currentPage, 1);
	assert.equal(pager.lastPage, 12);
	assert.equal(pager.state.pageSize, 25);

	// Number of button controls in this instance
	assert.equal(ctl.find('.ui-button').length, 5);
	assert.equal(ctl.find('.ui-button-text').length, 3);
	assert.equal(ctl.find('.ui-button-dialog').length, 1);
	assert.equal(ctl.find('.ui-title').length, 8);

	// Select the "50" from the dialog list, click and check page size
	// Goes from 25 -> 50
	ctl.find('.ui-title').at(5).simulate('click');

	// This wait must occur during the test because there is a built in click
	// delay where the component checks if a double click is occurring.
	await waitPromise(1)
		.then(() => {
			expect(select).toHaveBeenCalled();
			assert.equal(select.mock.calls[0][0], 1);

			assert.equal(pager.currentPage, 1);
			assert.equal(pager.lastPage, 6);
			assert.equal(pager.state.pageSize, 50);
		})
		.catch((err: string) => {
			assert.fail(err);
		});
});

test('Repeatedly create instance with different initial start for props test', () => {
	for (let i = 1; i < 5; i++) {
		const ctl = mount(
			<Pager
				initialPage={i}
				totalItems={299}
			/>
		);

		validate(ctl);
		const pager = ctl.instance() as Pager;
		assert(pager);

		assert.equal(pager.currentPage, i);
	}
});

// TODO: add test case for TextInput in Pager
// TODO: add test for Pager blur, change, keyPress
