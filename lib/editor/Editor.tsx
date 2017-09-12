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

const ace = require('brace');
require('brace/theme/monokai');
require('brace/mode/javascript');

const debug = require('debug')('Editor');
debug(`ACE: %o, version: ${ace.version}`, ace);

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
		/* const script = document.createElement('script');
		   const container = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];

		   script.type = 'text/javascript';
		   script.src = './ace/ace.js';
		   script.async = false;
		   container.appendChild(script);*/

		this.componentWillUpdate(this.props);
	}

	public componentDidMount() {
		this._editor = ace.edit(this._editorKey);
		this._editor.setTheme('ace/theme/monokai');
		this._editor.getSession().setMode('ace/mode/javascript');
		// this.forceUpdate();
	}

	public render() {
		return(
			<div id={this._editorKey} className={this.styles.editor} />
		);
	}
}
