'use strict';

import * as assert from 'assert';
import {QuillManager} from '../quillmanager';

test('Test creation of the QuillManager instance', () => {
	const qm = new QuillManager();
	assert(qm);
});
