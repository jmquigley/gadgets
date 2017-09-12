'use strict';

import * as assert from 'assert';
import {getDefaultEditorProps} from '../index';

test('Test retrieval of the Editor props object', () => {
	const props = getDefaultEditorProps();

	assert(props);
	expect(props).toMatchSnapshot();
});
