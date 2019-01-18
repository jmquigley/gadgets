'use strict';

import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {ButtonCircle, getDefaultButtonCircleProps} from './index';

test('Test retrieval of ButtonCircle props object', () => {
	const props = getDefaultButtonCircleProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a ButtonCircle control', () => {
	const ctl = shallow(<ButtonCircle className="test-class" />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test disabling of a ButtonCircle control', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} disabled={true} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test making a ButtonCircle control invisible', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} visible={false} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).not.toHaveBeenCalled();
});

test('Test ButtonCircle click event', () => {
	const click = jest.fn();
	const ctl = mount(<ButtonCircle onClick={click} />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();

	ctl.find('.ui-button').first().simulate('click');
	expect(click).toHaveBeenCalled();
});
