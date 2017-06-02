'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import {getDefaultLabelProps, Label} from './index';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test retrieval of defalt Label props object', t => {
	const props = getDefaultLabelProps();

	t.true('text' in props);
	t.is(props.text, ' ');
});

test('Test creation of a Label control', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Label className="test-class" text={s} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-label').length, 1);
	t.is(ctl.find('.test-class').length, 1);
	t.is(ctl.text(), s);
});

test('Test the disabling of the Label control', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Label disabled text={s} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.true(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));
	t.is(ctl.find('.ui-label').length, 1);
	t.is(ctl.find('.disabled').length, 1);
	t.is(ctl.text(), s);
});

test('Test making the Label control invisible', t => {
	let s: string = 'Test label text';
	const ctl = mount(<Label visible={false} text={s} />);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('id'), '');
	t.false(ctl.prop('disabled'));
	t.false(ctl.prop('visible'));
	t.is(ctl.find('.ui-label').length, 1);
	t.is(ctl.find('.invisible').length, 1);
	t.is(ctl.text(), s);
});
