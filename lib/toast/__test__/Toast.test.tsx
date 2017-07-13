'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {getDefaultToastProps, Toast, ToastLevel, ToastType} from '../index';

test('Test retrieval of Toast props object', () => {
	const props = getDefaultToastProps();

	expect(props).toBeTruthy();

	expect('bottom' in props).toBe(true);
	expect(props.bottom).toBe(false);

	expect('duration' in props).toBe(true);
	expect(props.duration).toBe(3);

	expect('level' in props).toBe(true);
	expect(props.level).toBe(ToastLevel.info);

	expect('type' in props);
	expect(props.type).toBe(ToastType.decay);
});

test('Test creation of a Toast control', () => {
	const ctl = mount(<Toast className="test-class" />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.test-class').length).toBe(1);
});

// TODO: create a Toast that decays, and validate that it has been closed
// TODO: create a toast that is persistent
// TODO: create a Toast control and click the close button
// TODO: add test to disable the Toast control
// TODO: add a test to make the Toast invisible
