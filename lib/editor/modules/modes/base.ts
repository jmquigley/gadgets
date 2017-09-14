'use strict';

export abstract class BaseEditorMode {

	protected _quill: any;
	protected _opts: any;

	constructor(quill: any, opts: any) {
		this._quill = quill;
		this._opts = opts;
	}

	get opts() {
		return this._opts;
	}

	get quill() {
		return this._quill;
	}

	protected abstract highlight(text: string, start: number, end: number): any;
}
