// TODO: Add implementation for Editor
// TODO: Add documentation for Editor

'use strict';

const debug = require('debug')('Editor');

import {globalize} from '../shared/helpers';
globalize('hljs', require('highlight.js'));
const Quill = globalize('Quill', require('quill'));

import {cloneDeep} from 'lodash';
import {Markup, MarkupMode} from 'quill-markup';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export interface QuillKeyBindings {
	[key: string]: any;
}

export interface EditorProps extends BaseProps {
	onChange?: any;
	onClick?: any;
	onClickLink?: any;
}

export function getDefaultEditorProps(): EditorProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			onChange: nilEvent,
			onClick: nilEvent,
			onClickLink: nilEvent
		})
	);
}

export interface EditorState {
	mode?: MarkupMode;
}

export class Editor extends BaseComponent<EditorProps, EditorState> {

	private _editor: any;
	private _editorKey: string = 'editor';
	private _keybindings: QuillKeyBindings = {
		'tab': {
			key: 9,
			handler: function(range: any) {
				this.quill.insertText(range.index, '    ');
				return false;
			}
		},
		'indent code-block': null,
		'outdent code-block': null,
		'code exit': null,
		'embed left': null,
		'embed right': null,
		'embed left shift': null,
		'embed right shift': null,
		'list autofill': null
	};
	private _markup: Markup;

	public static defaultProps: EditorProps = getDefaultEditorProps();

	constructor(props: EditorProps)	{
		super(props, require('./styles.css'));

		this.state = {
			mode: MarkupMode.markdown
		};

		this.componentWillUpdate(this.props);
	}

	public componentDidMount() {
		debug('componentDidMount');

		// The quill editor must be added after the component has mounted
		// because the DOM element used for replacement is not available
		// until the first render call.

		Quill.register('modules/markup', Markup);
		this._editor = new Quill(`#${this._editorKey}`, {
			modules: {
				history: {
					delay: 2000,
					maxStack: 500,
					userOnly: true
				},
				keyboard: {
					bindings: this._keybindings
				},
				markup: {
					followLinks: true,
					mode: MarkupMode.markdown,
					onChange: this.props.onChange,
					onClick: this.props.onClick,
					onClickLink: this.props.onClickLink
				},
				syntax: {
					delay: 100
				},
				toolbar: null
			},
			theme: 'snow'
		});

		this._markup = this._editor.getModule('highlight');
	}

	public render() {
		return(
			<div id={this._editorKey} className={this.styles.editor} />
		);
	}
}
