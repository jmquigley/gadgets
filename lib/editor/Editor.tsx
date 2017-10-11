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
import {getUUID, nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {Dropdown, DropdownOption} from '../dropdown';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Sizing
} from '../shared';
import {Toolbar} from '../toolbar';

export interface QuillKeyBindings {
	[key: string]: any;
}

export interface EditorProps extends BaseProps {
	defaultFont?: string;
	defaultFontSize?: number;
	onChange?: any;
	onClick?: any;
	onClickLink?: any;
}

export function getDefaultEditorProps(): EditorProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			defaultFont: 'Fira Code',
			defaultFontSize: 12,
			onChange: nilEvent,
			onClick: nilEvent,
			onClickLink: nilEvent
		})
	);
}

export class Editor extends BaseComponent<EditorProps, undefined> {

	private _editor: any;
	private _editorKey: string = 'editor';
	private _fontList: DropdownOption[] = [];
	private _fontSizes: DropdownOption[] = [];
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

	public static readonly defaultProps: EditorProps = getDefaultEditorProps();

	constructor(props: EditorProps)	{
		super(props, require('./styles.css'), Editor.defaultProps.style);

		if (!this.props.testing) {
			this._editorKey = `editor-${getUUID()}`;
		}

		debug('using editor key: %s', this._editorKey);

		this.bindCallbacks(
			'handleBold',
			'handleFont',
			'handleFontSize'
		);

		this.componentWillUpdate(this.props);
	}

	private handleBold() {
		this._markup.setBold();
	}

	private handleFont(fontName: string) {
		this._markup.setFont(fontName);
	}

	private handleFontSize(fontSize: string) {
		this._markup.setFontSize(Number(fontSize));
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

		this._markup = this._editor.getModule('markup');

		this.buildFontList();
		this.buildFontSizes();

		// This lifecycle method occurs after render on the first instance.
		// The component can't get some items from the component on the
		// first render pass because its not mounted.  This will force a
		// rerender to ensure things like the font list are updated
		this.forceUpdate();
	}

	private buildFontList() {
		this._fontList = this._markup.fonts.map((fontName: string) => (
			{val: fontName, label: fontName}
		));
	}

	private buildFontSizes() {
		const sizes: number[] = [
			8, 9, 10, 11, 12, 13, 14, 16, 20, 24, 32, 48
		];

		this._fontSizes = sizes.map((size: number) => (
			{val: String(size), label: String(size)}
		));
	}

	public render() {
		return(
			<div>
				<Toolbar className={this.styles.toolbar} sizing={Sizing.small}>
					<Dropdown
						defaultVal={this.props.defaultFont}
						items={this._fontList}
						onSelect={this.handleFont}
					/>
					<Dropdown
						defaultVal={this.props.defaultFontSize.toString()}
						items={this._fontSizes}
						onSelect={this.handleFontSize}
					/>
					<Button iconName="bold" onClick={this.handleBold} />
				</Toolbar>
				<div id={this._editorKey} className={this.styles.editor} />
			</div>
		);
	}
}
