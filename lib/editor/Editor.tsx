/**
 * A multi-line text editor control.  It uses a custom
 * [markup module](https://github.com/jmquigley/quill-markup) under the
 * [Quill](https://quilljs.com/) editor/api.  It has the following
 * editing modes for highlighting:
 *
 * - Plaintext
 * - Markdown
 *
 * The modes available are dependent on the Quill module.
 *
 * The control has a built in toolbar to assist with editing a document.
 * The tools include:
 *
 * - Changing the font and font size of the content
 * - Modifying text properties (bold, italic, etc)
 * - Changing the editing mode highlighting
 * - Changing the syntax highlihgting color scheme
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/editor.png" width="70%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Editor} from 'gadgets';
 *
 * <Editor
 *     content=''
 *     onChange={someFunction(text)}
 *     scheme={{bold: "red"}}
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onChange(text: string)` - Invoked when the editor control is modified.
 * It receives a reference to the content text that was changed.  It is rate
 * limited to only be called once every 250ms
 * - `onClick(pos: number)` - Invoked when the user clicks on a position within
 * the editor.
 * - `onClickLink(link: Match)` - Invoked when a user clicks on a reference link
 * within the content (dependent on the editing mode)
 *
 * #### Styles
 * - `ui-editor` - a global style attached to the root `<div>` around the toolbar
 * and the editor.
 * - `ui-editor-toolbar` - a global style attached to the `<div>` around the
 * toolbar component.
 * - `ui-editor-quill` - a global style attached to the Quill editor component
 *
 * #### Properties
 * - `content: {string} ('')` - the initial text content for the component
 * - `defaultFont: {string} ('Fira Code')` - The name of the default editor font
 * - `defaultFontSize: {number} (12)` - The size of the font in pixels (px)
 * - `scheme: {Object} ({foreground: 'white', background: 'black'})` - the
 * color customizations used by the markup processor.  It contains the following
 * keys:
 *
 *   - `admonition` - special strings like TODO or FIXME.  This is the
 *     foreground color
 *   - `admonitionBackground` - background color for special strings like TODO
 *     and FIXME
 *   - `attribute` - special mode attribute highlighting (like ascii doc keys
 *     and attributes)
 *   - `background (white)` - the editor background color
 *   - `blockquote`
 *   - `bold`
 *   - `chevron` - the paren, brace, brackets around an item (such as a link)
 *   - `comment` - a comment block within the document.  These sections are not
 *     used when the document is generated.
 *   - `fence` - The color of the fenced code region
 *   - `foreground (black)` - the editor foreground color
 *   - `forumula` - LaTeX formula regions or inlines
 *   - `h1` - header level 1
 *   - `h2` - header level 2
 *   - `h3` - header level 3
 *   - `h4` - header level 4
 *   - `h5` - header level 5
 *   - `h6` - header level 6
 *   - `hr` - horizontal line markup
 *   - `italic`
 *   - `keywords` - special keywords that are used by a mode.  Not all modes
 *     will use these
 *   - `language` - the name of the language for a fenced code region.  Today
 *     this is just decoration due to limits in Quill (it  only uses code to
 *     try discover the language implicitly instead of  explicit declaration)
 *   - `link` - URI links
 *   - `linkName` - The color associated with the name ([name](link)) in a link
 *   - `linkTitle` - optional title values on links
 *   - `list` - number and bullet list chevrons
 *   - `mono`
 * - `option` - special option inline tokens (like the .Title token in
 *   asciidoc)
 *   - `strikethrough`
 *   - `underline`
 *   - `wiki` - wiki name coloring in [[name | link]]
 *
 * @module Editor
 */

'use strict';

const debug = require('debug')('Editor');

import {globalize} from '../shared/helpers';
globalize('hljs', require('highlight.js'));
const Quill = globalize('Quill', require('quill'));

import {cloneDeep} from 'lodash';
import {Markup, MarkupMode} from 'quill-markup';
import * as React from 'react';
import {ClassNames} from 'util.classnames';
import {getUUID, nilEvent} from 'util.toolbox';
import {Button} from '../button';
import {ButtonDialog} from '../buttonDialog';
import {Divider, DividerType} from '../divider';
import {Dropdown, DropdownOption} from '../dropdown';
import {List, ListItem} from '../list';
import {
	BaseComponent,
	BaseProps,
	Color,
	getDefaultBaseProps,
	Sizing
} from '../shared';
import {Toolbar} from '../toolbar';

export interface QuillKeyBindings {
	[key: string]: any;
}

export interface EditorProps extends BaseProps {
	background?: string;
	content?: string;
	defaultFont?: string;
	defaultFontSize?: number;
	foreground?: string;
	onChange?: any;
	onClick?: any;
	onClickLink?: any;
	scheme?: any;
}

export function getDefaultEditorProps(): EditorProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			content: '',
			defaultFont: 'Fira Code',
			defaultFontSize: 12,
			onChange: nilEvent,
			onClick: nilEvent,
			onClickLink: nilEvent,
			scheme: {
				background: Color.black,
				foreground: Color.white
			}
		})
	);
}

export class Editor extends BaseComponent<EditorProps, undefined> {

	private _custom: any;
	private _editor: any;
	private _editorKey: string = 'editor';
	private _fontList: DropdownOption[] = [];
	private _fontSizes: DropdownOption[] = [];
	private _highlights: DropdownOption[] = [];
	private _keybindings: QuillKeyBindings = {
		'tab': {
			key: 9,
			handler: function(textRange: any) {
				this.quill.insertText(textRange.index, '    ');
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
	private _modes: DropdownOption[] = [];
	private _editorStyles: ClassNames = new ClassNames();
	private _toolbarStyles: ClassNames = new ClassNames();

	public static readonly defaultProps: EditorProps = getDefaultEditorProps();

	constructor(props: EditorProps)	{
		super(props, require('./styles.css'), Editor.defaultProps.style);

		if (!this.props.testing) {
			this._editorKey = `editor-${getUUID()}`;
		}
		debug('using editor key: %s', this._editorKey);

		this._editorStyles.add([
			'ui-editor-quill',
			this.styles.editor
		]);

		this._rootStyles.add([
			'ui-editor',
			this.styles.container
		]);

		this._toolbarStyles.add([
			'ui-editor-toolbar',
			this.styles.toolbar
		]);

		this.bindCallbacks('handleSelect');

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
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

	private buildHighlights() {
		this._highlights = this._markup.highlights.map((highlight: string) => (
			{val: highlight, label: highlight.capitalize().replace(/\W/g, ' ')}
		));
	}

	private buildModes() {
		this._modes = this._markup.modes.map((mode: string) => (
			{val: mode, label: mode.capitalize()}
		));
	}

	private handleSelect(level: string) {
		return () => {
			this._markup.setHeader(level);
		};
	}

	public componentWillUpdate(nextProps: EditorProps) {
		this._editorStyles.onIf('disabled' in nextProps && nextProps['disabled'])(
			this.styles.disabled,
			'nohover'
		);
	}

	public componentWillReceiveProps(nextProps: EditorProps) {
		if (this._editor) {
			if (nextProps.disabled) {
				this._editor.enable(false);
			} else {
				this._editor.enable(true);
			}
		}

		this._custom = Object.assign({},
			Editor.defaultProps.scheme,
			nextProps.scheme
		);
	}

	public componentDidMount() {

		// The quill editor must be added after the component has mounted
		// because the DOM element used for replacement is not available
		// until the first render call.

		Quill.register('modules/markup', Markup);
		this._editor = new Quill(`#${this._editorKey}`, {
			modules: {
				history: {
					delay: 2000,
					maxStack: 500,
					userOnly: false
				},
				keyboard: {
					bindings: this._keybindings
				},
				markup: {
					custom: this._custom,
					fontName: this.props.defaultFont,
					fontSize: this.props.defaultFontSize,
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
		this._markup.setContent(this.props.content);
		this._markup.refresh();

		this.buildFontList();
		this.buildFontSizes();
		this.buildHighlights();
		this.buildModes();

		// This lifecycle method occurs after render on the first instance.
		// The component can't get some items from the component on the
		// first render pass because its not mounted.  This will force a
		// rerender to ensure things like the font list are updated
		this.forceUpdate();
	}

	public render() {
		return(
			<div
				className={this._rootStyles.classnames}
				style={this.inlineStyles}
			>
				<Toolbar
					{...this.props}
					className={this._toolbarStyles.classnames}
					sizing={Sizing.small}
				>
					<Button iconName="bold" onClick={this._markup && this._markup.setBold} />
					<Button iconName="italic" onClick={this._markup && this._markup.setItalic} />
					<Button iconName="underline" onClick={this._markup && this._markup.setUnderline} />
					<Button iconName="strikethrough" onClick={this._markup && this._markup.setStrikeThrough} />
					<Button iconName="code" onClick={this._markup && this._markup.setMono} />
					<ButtonDialog iconName="header">
						<List sizing={Sizing.small} alternating>
							<ListItem title="h1" onSelect={this.handleSelect('1')} />
							<ListItem title="h2" onSelect={this.handleSelect('2')} />
							<ListItem title="h3" onSelect={this.handleSelect('3')} />
							<ListItem title="h4" onSelect={this.handleSelect('4')} />
							<ListItem title="h5" onSelect={this.handleSelect('5')} />
							<ListItem title="h6" onSelect={this.handleSelect('6')} />
						</List>
					</ButtonDialog>
					<Divider dividerType={DividerType.vertical} />
					<Button iconName="undo" onClick={this._markup && this._markup.undo} />
					<Button iconName="repeat" onClick={this._markup && this._markup.redo} />
					<Divider dividerType={DividerType.vertical} />
					<Dropdown
						{...this.props}
						defaultVal={this.props.defaultFont}
						items={this._fontList}
						onSelect={this._markup && this._markup.setFont}
					/>
					<Dropdown
						{...this.props}
						defaultVal={this.props.defaultFontSize.toString()}
						items={this._fontSizes}
						onSelect={this._markup && this._markup.setFontSize}
					/>
					<Dropdown
						{...this.props}
						defaultVal={'markdown'}
						items={this._modes}
						onSelect={this._markup && this._markup.setMode}
					/>
					<Dropdown
						{...this.props}
						defaultVal={'solarized-light'}
						items={this._highlights}
						onSelect={this._markup && this._markup.setHighlight}
						style={{
							width: '6rem'
						}}
					/>
					<Button iconName="refresh" onClick={this._markup && this._markup.refresh()} />
				</Toolbar>
				<div id={this._editorKey} className={this._editorStyles.classnames} />
			</div>
		);
	}
}
