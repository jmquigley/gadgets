'use strict';

import {mount} from 'enzyme';
import * as React from 'react';
import {Select} from '../index';

test('Test creation of a Select control', () => {
	const ctl = mount(<Select className="test-class" />);

	expect(ctl).toBeTruthy();

	expect(ctl.prop('disabled')).toBe(false);
	expect(ctl.prop('visible')).toBe(true);
	expect(ctl.find('.test-class').length).toBe(1);
	expect(ctl.find('.ui-select').length).toBe(1);
});

// TODO: disabling the badge control
// TODO: make the badge invisible
// TODO: test adding/retrieving text example from the Select control
