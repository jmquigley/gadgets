'use strict';

import * as assert from 'assert';
// import {mount, shallow} from 'enzyme';
// import * as React from 'react';
// import * as sinon from 'sinon';
import {getDefaultToolbarProps} from '../index';

test('Test retrieval of Toolbar props object', () => {
	const props = getDefaultToolbarProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
