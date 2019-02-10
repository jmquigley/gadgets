'use strict';

const debug = require('debug')('helpers.test');

import {globalize} from './helpers';

test('Add a global reference (no replacement)', () => {
	expect((global as any).GlobalTest == null).toBe(true);

	const g = globalize('GlobalTest', {foo: 'bar'});

	expect(g).toBeDefined();
	expect((global as any)['GlobalTest']).toBeDefined();
	expect((global as any)['GlobalTest'] === g).toBe(true);

	debug('global: %O', g);

	expect((global as any)['GlobalTest']['foo'] === 'bar').toBe(true);

	globalize('GlobalTest', {foo: 'baz'});

	expect((global as any)['GlobalTest']['foo'] === 'bar').toBe(true);

	delete (global as any)['GlobalTest'];
});

test('Add a global reference (with replacement)', () => {
	expect((global as any).GlobalTest == null).toBeDefined();

	const g = globalize('GlobalTest', {foo: 'bar'});

	expect(g).toBeDefined();
	expect((global as any)['GlobalTest']).toBeDefined();
	expect((global as any)['GlobalTest'] === g).toBe(true);

	debug('global: %O', g);

	expect((global as any)['GlobalTest']['foo'] === 'bar').toBe(true);

	globalize('GlobalTest', {foo: 'baz'}, true);

	expect((global as any)['GlobalTest']['foo'] === 'baz').toBe(true);

	delete (global as any)['GlobalTest'];
});
