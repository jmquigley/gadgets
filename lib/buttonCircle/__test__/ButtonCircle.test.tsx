'use strict';

import * as assert from 'assert';
import {mount} from 'enzyme';
import * as React from 'react';
import {ButtonCircle, getDefaultButtonCircleProps} from '../index';

test('Test retrieval of ButtonCircle props object', () => {
	const props = getDefaultButtonCircleProps();

	assert(props);

	assert('iconName' in props);
	assert.equal(props.iconName, 'bomb');
});

test('Test creation of a ButtonCircle control', () => {
	const ctl = mount(<ButtonCircle className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test ButtonCircle click event', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(ctl.prop('visible'));

	ctl.find('.ui-button').simulate('click');
	expect(click).toHaveBeenCalled();
});

test('Test disabling of a ButtonCircle control', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(ctl.prop('disabled'));
	assert(ctl.prop('visible'));
	assert.equal(ctl.find('.disabled').length, 2);

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonCircle control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} visible={false} />);

	assert(ctl);

	assert.equal(ctl.prop('iconName'), 'bomb');
	assert(!ctl.prop('disabled'));
	assert(!ctl.prop('visible'));
	assert.equal(ctl.find('.invisible').length, 2);

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});
