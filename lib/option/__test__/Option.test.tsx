'use strict';

import * as assert from 'assert';
import {getDefaultOptionProps} from '../index';

test('Test retrieval of Option props object', () => {
	const props = getDefaultOptionProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
