/**
 *  Throwaway test helper functions that are shared between tests
 */

"use strict";

import * as fs from "fs-extra";
import {Fixture} from "util.fixture";

export function cleanup(msg: string, done: any): void {
	if (msg) {
		console.log(`final cleanup: ${msg}`);
	}

	Fixture.cleanup((err: Error, directories: string[]) => {
		if (err) {
			throw new Error(`Failure cleaning up after test: ${err.message}`);
		}

		directories.forEach((directory: string) => {
			expect(fs.existsSync(directory)).toBe(false);
		});

		done();
	});
}
