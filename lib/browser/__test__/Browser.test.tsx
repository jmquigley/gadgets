'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Browser, getDefaultBrowserProps} from '../index';

test('Test retrieval of the Browser props object', () => {
	const props = getDefaultBrowserProps();

	expect(props).toBeTruthy();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Browser instance', () => {
	const ctl = mount(<Browser url="http://example.com" />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Browser instance with empty uri values', () => {
	const ctl = mount(<Browser url="" home="" />);

	expect(ctl).toBeTruthy();
	expect(ctl).toMatchSnapshot();
});
