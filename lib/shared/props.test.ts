'use strict';

import * as assert from 'assert';
import {getDefaultBaseProps} from '../index';

test('Test retrieval of default prop object', () => {
	const props = getDefaultBaseProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
