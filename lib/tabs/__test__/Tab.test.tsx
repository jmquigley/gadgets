'use strict';

import * as assert from 'assert';
// import {mount, shallow} from 'enzyme';
// import * as React from 'react';
import {getDefaultTabProps} from '../index';

test('Test retrieval of Tab props object', () => {
	const props = getDefaultTabProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
