/**
 *  Throwaway test helper functions that are shared between tests
 */

'use strict';

import {CallbackTestContext, TestContext} from 'ava';
import * as fs from 'fs-extra';
import {Fixture} from 'util.fixture';
import logger from 'util.log';

let jsdomCleanup: any = null;

export const log = logger.instance({
	debug: true,
	namespace: 'app_testing',
	nsWidth: 11
});

export function cleanup(msg: string, t: CallbackTestContext): void {
	if (msg) {
		console.log(`final cleanup: ${msg}`);
	}

	Fixture.cleanup((err: Error, directories: string[]) => {
		if (err) {
			return t.fail(`Failure cleaning up after test: ${err.message}`);
		}

		directories.forEach((directory: string) => {
			t.false(fs.existsSync(directory));
		});

		t.end();
	});

	if (jsdomCleanup != null) {
		jsdomCleanup();
	}
}

export function header(msg: string, t: TestContext): void {
	console.log(`Testing: ${msg}`);
	t.pass(msg);
}

/**
 * This creates a mockup environment for css modules and creates a
 * virtual DOM (jsdom) for testing react components.
 */
export function mockupEnv(): void {
	require('mock-css-modules');
	jsdomCleanup = require('jsdom-global')();
}
