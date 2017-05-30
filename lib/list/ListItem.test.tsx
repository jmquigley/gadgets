'use strict';

import {cleanup, log, mockupEnv} from '../../test/helpers';
mockupEnv();

import test from 'ava';
import {mount} from 'enzyme';
import * as path from 'path';
import * as React from 'react';
import * as sinon from 'sinon';
import {ListItem} from './index';
import {Button} from '../button';

test.after.always.cb(t => {
	cleanup(path.basename(__filename), t);
});

test('Test the creation of a ListItem control with simple title', t => {
	const ctl = mount(
		<ListItem
			leftTitle="test title"
			selected
		/>
	);

	t.truthy(ctl);
	log.debug(ctl.html(), __filename);

	t.is(ctl.prop('leftTitle'), 'test title');
	t.false(ctl.prop('disabled'));
	t.true(ctl.prop('visible'));

	t.is(ctl.find('.ui-listitem').length, 1);
	t.is(ctl.find('.ui-selected').length, 1);
	t.is(ctl.find('.listItem').length, 1);
});

test('Test the creation of a ListItem control with left & right title', t => {
 	const ctl = mount(
 		<ListItem
			leftTitle="test title left"
			rightTitle="test title right"
		/>
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title left');
 	t.is(ctl.prop('rightTitle'), 'test title right');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
});

test('Test disabling of a ListItem control', t => {
 	const ctl = mount(
 		<ListItem leftTitle="test title" disabled={true} />
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title');
 	t.true(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.disabled').length, 1);
 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
});

test('Test making ListItem control invisible', t => {
 	const ctl = mount(
 		<ListItem leftTitle="test title" visible={false} />
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title');
 	t.false(ctl.prop('disabled'));
 	t.false(ctl.prop('visible'));
 	t.is(ctl.find('.invisible').length, 1);
 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
});

test('Test clicking of the left button on the ListItem control', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			leftTitle="test title"
			leftButton={<Button iconName="bath" onClick={click} />}
		/>
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
 	ctl.find('i').first().simulate('click');
 	t.true(click.calledOnce);
 	t.is(ctl.find('.fa').length, 1);
 	t.is(ctl.find('.fa-bath').length, 1);
});

test('Test clicking of the right button on the ListItem control', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			leftTitle="test title"
			rightButton={<Button iconName="bath" onClick={click} />}
		/>
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);
 	ctl.find('i').last().simulate('click');
 	t.true(click.calledOnce);
 	t.is(ctl.find('.fa').length, 1);
 	t.is(ctl.find('.fa-bath').length, 1);
});

test('Test clicking of the title bar area of the ListItem', t => {
 	const click = sinon.spy();
 	const ctl = mount(
 		<ListItem
			leftTitle="test title"
			onClick={click}
		/>
 	);

 	t.truthy(ctl);
 	log.debug(ctl.html(), __filename);

 	t.is(ctl.prop('leftTitle'), 'test title');
 	t.false(ctl.prop('disabled'));
 	t.true(ctl.prop('visible'));

 	t.is(ctl.find('.ui-listitem').length, 1);
 	t.is(ctl.find('.listItem').length, 1);

 	ctl.find('.title').simulate('click');
 	t.true(click.calledOnce);
});
