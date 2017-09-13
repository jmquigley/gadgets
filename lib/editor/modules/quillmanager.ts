'use strict';

const debug = require('debug')('QuillManager');
const Quill = require('quill');

import {
	Markdown
} from './modes';

export enum EditorMode {
	markdown,
	richedit
}

export enum EditorStyle {
	custom = 'custom',
	monokai = 'monokai'
}

export class QuillManager {

	// Quill instances composed of mode + style
	private _instances: Map<string, any> = new Map<string, any>();

	// Styling option objects sent to a quill instance
	private _styles: Map<string, any> = new Map<string, any>();

	constructor() {
		Quill.register('modules/markdown', Markdown);

		this._styles[EditorStyle.monokai] = require('./styles/monokai.json');
	}

	public get(mode: EditorMode, style: EditorStyle, custom: any = {}, id: string = 'editor') {

		const key: string = `${mode}-${style}`;
		debug(`Retrieving quill instance: ${key}`);

		if (!this._instances.has(key)) {

			let opts: any = {};
			if (style && style !== EditorStyle.custom) {
				opts = Object.assign(opts, this._styles[style]);
			} else {
				opts = Object.assign(opts, custom);
			}

			switch (mode) {
				case EditorMode.markdown:
					this._instances.set(key,
						new Quill(`#${id}`, {
							modules: {
								markdown: opts
							},
							theme: 'snow'
						})
					);
					break;

				default:
					this._instances.set(key,
						new Quill(`#${id}`, {
							theme: 'snow'
						})
					);
					break;
			}
		}

		return this._instances.get(key);
	}

}
