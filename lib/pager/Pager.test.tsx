'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {Pager, getDefaultPagerProps} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of Pager props object', t => {
	const props = getDefaultPagerProps();

	t.true('pagesToDisplay' in props);
	t.is(props.pagesToDisplay, 3);

	t.true('pageSize' in props);
	t.is(props.pageSize, 25);

	t.true('totalItems' in props);
	t.is(props.totalItems, 0);
});

test('Test creation of a Pager control', t => {
	const ctl = mount(<Pager className="test-class" />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.test-class').length, 1);
});

test('Test pager getPages method with front of list', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: 1,
		pageSize: 25,
		totalItems: 299,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
});

test('Test pager getPages method with 2nd to last in list', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: 11,
		pageSize: 25,
		totalItems: 299,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [10,11,12]);
	t.is(pager.currentPage, 11);
	t.is(pager.lastPage, 12);
});

test('Test Pager getPages method with last in the List', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: 12,
		pageSize: 25,
		totalItems: 299,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [10,11,12]);
	t.is(pager.currentPage, 12);
	t.is(pager.lastPage, 12);
});

test('Test Pager getPages method with invalid initial page (negative test)', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: -1,
		pageSize: 25,
		totalItems: 299,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [1,2,3]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 12);
});

test('Test Pager getPages method with invalid pageSize (negative test)', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: 1,
		pageSize: 0,
		totalItems: 299,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [1,0,0]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 1);
});

test('Test Pager getPages method with invalid totalItems (negative test)', t => {
	let pager = new Pager(Object.assign({...Pager.defaultProps}, {
		initialPage: 1,
		pageSize: 25,
		totalItems: 0,
	}));

	t.truthy(pager);
	t.deepEqual(pager.pages, [1,0,0]);
	t.is(pager.currentPage, 1);
	t.is(pager.lastPage, 1);
});
