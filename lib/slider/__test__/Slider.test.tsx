'use strict';

// import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {getDefaultSliderProps, Slider} from '../index';

test('Test retrieval of Slider props object', () => {
	const props = getDefaultSliderProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});
