'use strict';

import {getDefaultBaseProps} from './props';

test('Test retrieval of default prop object', () => {
	const props = getDefaultBaseProps();

	expect(props).toBeDefined();
	expect(props).toMatchSnapshot();
});
