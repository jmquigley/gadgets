/**
 *  Throwaway test helper functions that are shared between tests
 */

// TODO: move the test helper functions to lib/shared

'use strict';

import {CallbackTestContext} from 'ava';
import * as fs from 'fs-extra';
import {Fixture} from 'util.fixture';

// let jsdomCleanup: any = null;

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

	// if (jsdomCleanup != null) {
	// 	jsdomCleanup();
	// }
}

/**
 * This creates a mockup environment for css modules and creates a
 * virtual DOM (jsdom) for testing react components.
 */
export function mockupEnv(): void {
	require('mock-css-modules');
	// jsdomCleanup = require('jsdom-global')();
}
