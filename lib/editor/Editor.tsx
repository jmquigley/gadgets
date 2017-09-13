// TODO: Add implementation for Editor
// TODO: Add documentation for Editor

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

const debug = require('debug')('Editor');
const Quill = require('quill');

debug(Quill);

export interface EditorProps extends BaseProps {
	maxTabs?: number;
}

export function getDefaultEditorProps(): EditorProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			maxTabs: 5
		})
	);
}

export class Editor extends BaseComponent<EditorProps, undefined> {

	private _editor: any;
	private _editorKey: string = 'editor';

	public static defaultProps: EditorProps = getDefaultEditorProps();

	constructor(props: EditorProps)	{
		super(props, require('./styles.css'));

		this.bindCallbacks(
			'handleChange'
		);

		this.componentWillUpdate(this.props);
	}

	private handleChange(delta: any, old: any, source: string) {
		debug(`change: %o, old: %o, source: %s`, delta, old, source);
	}

	public componentDidMount() {

		this._editor = new Quill(`#${this._editorKey}`, {
			theme: 'snow'
		});

		debug(`Quill: %o, version: %s`, this._editor, Quill.version);
		this._editor.on('text-change', this.handleChange);

		// this.forceUpdate();
	}

	public render() {
		return(
			<div id={this._editorKey} className={this.styles.editor} />
		);
	}
}
