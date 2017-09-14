/**
 * Used by the Editor react component to create and manage different instances
 * of the Quill library based on the selected editing mode and display style.
 * This class will automatically read the style configuration objects and
 * custom syntax highlighting modules and make them available on request.
 *
 * When a custom mode/style is requested a new Quill instance is created and
 * cached (memoized).
 *
 * This class is not used directly by the Editor class.  A global `instance`
 * method is provided as the entry point for retrieving Quill instances (in
 * the index for the `modules`),
 *
 * #### Examples:
 *
 * ```javascript
 * const qm = new QuillManager()
 * ```
 *
 * @module QuillManager
 */

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

	/**
	 * Retrieves a custom Quill instances based on a user selected editing mode
	 * and style.  The request is cached, so only one instace of any
	 * mode/style will be created.
	 * @param mode {EditorMode} an enumeration for all highlighting modes in
	 * the control.
	 * @param style {EditorStyle} an enumeration for all styles in the the control
	 * @param custom {any} when the custom style is chosen this object will hold
	 * styling (color) values for each token (suchs as bold, italic, etc)
	 * @param id {string} the DOM reference id where Quill will draw the control
	 */
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

				case EditorMode.richedit:
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
