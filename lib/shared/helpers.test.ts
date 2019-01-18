'use strict';

const debug = require('debug')('helpers.test');

import * as assert from 'assert';
import {globalize} from './helpers';

test('Add a global reference (no replacement)', () => {
	assert((global as any).GlobalTest == null);

	const g = globalize('GlobalTest', {foo: 'bar'});

	assert(g);
	assert((global as any)['GlobalTest']);
	assert((global as any)['GlobalTest'] === g);

	debug('global: %O', g);

	assert((global as any)['GlobalTest']['foo'] === 'bar');

	globalize('GlobalTest', {foo: 'baz'});

	assert((global as any)['GlobalTest']['foo'] === 'bar');

	delete (global as any)['GlobalTest'];
});

test('Add a global reference (with replacement)', () => {
	assert((global as any).GlobalTest == null);

	const g = globalize('GlobalTest', {foo: 'bar'});

	assert(g);
	assert((global as any)['GlobalTest']);
	assert((global as any)['GlobalTest'] === g);

	debug('global: %O', g);

	assert((global as any)['GlobalTest']['foo'] === 'bar');

	globalize('GlobalTest', {foo: 'baz'}, true);

	assert((global as any)['GlobalTest']['foo'] === 'baz');

	delete (global as any)['GlobalTest'];
});
