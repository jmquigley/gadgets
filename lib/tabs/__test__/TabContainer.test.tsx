'use strict';

import * as assert from 'assert';
// import {mount, shallow} from 'enzyme';
// import * as React from 'react';
import {getDefaultTabContainerProps} from '../index';

test('Test retrieval of Tabs props object', () => {
	const props = getDefaultTabContainerProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
