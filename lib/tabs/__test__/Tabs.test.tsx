'use strict';

import * as assert from 'assert';
// import {mount, shallow} from 'enzyme';
// import * as React from 'react';
import {getDefaultTabsProps} from '../index';

test('Test retrieval of Tabs props object', () => {
	const props = getDefaultTabsProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
