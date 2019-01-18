'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Browser, getDefaultBrowserProps} from './index';

test('Test retrieval of the Browser props object', () => {
	const props = getDefaultBrowserProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});

test('Test creation of a Browser instance', () => {
	const ctl = mount(<Browser uri="http://example.com" />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});

test('Test creation of a Browser instance with empty uri values', () => {
	const ctl = mount(<Browser uri="" home="" />);

	expect(ctl).toBeDefined();
	expect(ctl).toMatchSnapshot();
});
