'use strict';

import * as assert from 'assert';
import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {ButtonCircle, getDefaultButtonCircleProps} from '../index';

test('Test retrieval of ButtonCircle props object', () => {
	const props = getDefaultButtonCircleProps();

	assert(props);
	expect(props).toMatchSnapshot();
});

test('Test creation of a ButtonCircle control', () => {
	const ctl = shallow(<ButtonCircle className="test-class" />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a ButtonCircle control', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonCircle control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} visible={false} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test ButtonCircle click event', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} />);

	assert(ctl);
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').simulate('click');
	expect(click).toHaveBeenCalled();
});
