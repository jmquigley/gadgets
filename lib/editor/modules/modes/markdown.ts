'use strict';

import {BaseEditorMode} from './base';

const debug = require('debug')('Markdown');

export class Markdown extends BaseEditorMode {
	constructor(quill: any, opts: any) {
		super(quill, opts);
		debug('creating markdown module mode %o, opts: %o', quill, opts);
	}

	public highlight(text: string, start: number, end: number): any {
		debug('highlighting markdown text %s, start: %d, end: %d', text, start, end);
		return null;
	}
}
