/**
 * A multi-line text editor control.  It uses a custom
 * [markup module](https://github.com/jmquigley/quill-markup) under the
 * [Quill](https://quilljs.com/) editor/api.  It has the following
 * editing modes for highlighting:
 *
 * - Asciidoc
 * - Markdown
 * - Plaintext
 * - Restructuredtext
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
 * - `useSmallButtons: {boolean} (false)` - if set to true, then the buttons
 * on the toolbar will use sizing.SMALL, otherwise the sizing is set to the
 * default for the component (which is typically Sizing.normal).
 *
 * @module Editor
 */

const debug = require("debug")("gadgets.Editor");

const Quill = (global as any).Quill;

import autobind from "autobind-decorator";
import {Markup, MarkupMode} from "quill-markup";
import * as React from "react";
import {ClassNames} from "util.classnames";
import {Match} from "util.matches";
import {nilEvent} from "util.toolbox";
import {Button} from "../button";
import {ButtonDialog} from "../buttonDialog";
import {Divider} from "../divider";
import {Dropdown, DropdownOption} from "../dropdown";
import {List, ListItem} from "../list";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	DisabledCSS,
	getDefaultBaseProps,
	getDefaultBaseState,
	InvisibleCSS,
	Sizing,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";
import {Toolbar} from "../toolbar";

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
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClickLink?: (match: Match) => void;
	scheme?: any;
	useSmallButtons?: boolean;
}

export function getDefaultEditorProps(): EditorProps {
	return {
		...getDefaultBaseProps(),
		content: "",
		defaultFont: "Fira Code",
		defaultFontSize: 12,
		obj: "Editor",
		onChange: nilEvent,
		onClick: nilEvent,
		onClickLink: nilEvent,
		scheme: {
			background: Color.black,
			foreground: Color.white
		},
		useSmallButtons: false
	};
}

export type EditorState = BaseState;

export function getDefaultEditorState(): EditorState {
	return {
		...getDefaultBaseState()
	};
}

const EditorContainer: any = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: inherit;
	min-width: 625px;
	width: inherit;
`;

const EditorView: any = styled.div`
	display: flex;
	min-width: inherit;

	> .ql-editor {
		min-width: inherit;
		padding: 5px;
		width: 100%;
	}

	${(props: EditorProps) => props.disabled && DisabledCSS}
	${(props: EditorProps) => !props.visible && InvisibleCSS}
`;

const EditorToolbar: any = styled(Toolbar)`
	margin-bottom: -1px;
	min-width: inherit;
`;

export class Editor extends BaseComponent<EditorProps, EditorState> {
	private _custom: any;
	private _editor: any;
	private _fontList: DropdownOption[] = [];
	private _fontSizes: DropdownOption[] = [];
	private _highlights: DropdownOption[] = [];
	private _keybindings: QuillKeyBindings = {
		tab: {
			key: 9,
			handler: function(textRange: any) {
				this.quill.insertText(textRange.index, "    ");
				return false;
			}
		},
		"indent code-block": null,
		"outdent code-block": null,
		"code exit": null,
		"embed left": null,
		"embed right": null,
		"embed left shift": null,
		"embed right shift": null,
		"list autofill": null
	};
	private _markup: Markup;
	private _modes: DropdownOption[] = [];
	private _editorStyles: ClassNames = new ClassNames("ui-editor-quill");
	private _toolbarStyles: ClassNames = new ClassNames("ui-editor-toolbar");

	public static readonly defaultProps: EditorProps = getDefaultEditorProps();
	public state: EditorState = getDefaultEditorState();

	constructor(props: EditorProps) {
		super(props, "ui-editor", Editor.defaultProps.style);
		debug('Editor key: "%s"', this.id);
	}

	private buildFontList() {
		this._fontList = this._markup.fonts.map((fontName: string) => ({
			value: fontName,
			label: fontName
		}));
	}

	private buildFontSizes() {
		const sizes: number[] = [8, 9, 10, 11, 12, 13, 14, 16, 20, 24, 32, 48];

		this._fontSizes = sizes.map((size: number) => ({
			value: String(size),
			label: String(size)
		}));
	}

	private buildHighlights() {
		this._highlights = this._markup.highlights.map((highlight: string) => ({
			value: highlight,
			label: highlight.capitalize().replace(/\W/g, " ")
		}));
	}

	private buildModes() {
		this._modes = this._markup.modes.map((mode: string) => ({
			value: mode,
			label: mode.capitalize()
		}));
	}

	@autobind
	private handleSelect(level: string) {
		return () => {
			this._markup.setHeader(level);
		};
	}

	public componentDidMount() {
		// The quill editor must be added after the component has mounted
		// because the DOM element used for replacement is not available
		// until the first render call.

		Quill.register("modules/markup", Markup);
		this._editor = new Quill(`#${this.id}`, {
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
			theme: "snow"
		});

		this._markup = this._editor.getModule("markup");
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
		this.updateClassName();

		if (this._editor) {
			if (this.props.disabled) {
				this._editor.enable(false);
			} else {
				this._editor.enable(true);
			}
		}

		this._custom = Object.assign(
			{},
			Editor.defaultProps.scheme,
			this.props.scheme
		);

		return (
			<Wrapper {...this.props}>
				<EditorContainer
					className={this.className}
					style={this.state.style}
				>
					<EditorToolbar
						{...this.props}
						className={this._toolbarStyles.value}
						sizing={
							this.props.useSmallButtons
								? Sizing.small
								: this.props.sizing
						}
					>
						<Button
							iconName='bold'
							onClick={this._markup && this._markup.setBold}
						/>
						<Button
							iconName='italic'
							onClick={this._markup && this._markup.setItalic}
						/>
						<Button
							iconName='underline'
							onClick={this._markup && this._markup.setUnderline}
						/>
						<Button
							iconName='strikethrough'
							onClick={
								this._markup && this._markup.setStrikeThrough
							}
						/>
						<Button
							iconName='code'
							onClick={this._markup && this._markup.setMono}
						/>
						<ButtonDialog iconName='header' notriangle>
							<List sizing={Sizing.small} alternating noselect>
								<ListItem
									title='h1'
									onSelect={this.handleSelect("1")}
								/>
								<ListItem
									title='h2'
									onSelect={this.handleSelect("2")}
								/>
								<ListItem
									title='h3'
									onSelect={this.handleSelect("3")}
								/>
								<ListItem
									title='h4'
									onSelect={this.handleSelect("4")}
								/>
								<ListItem
									title='h5'
									onSelect={this.handleSelect("5")}
								/>
								<ListItem
									title='h6'
									onSelect={this.handleSelect("6")}
								/>
							</List>
						</ButtonDialog>
						<Divider />
						<Button
							iconName='undo'
							onClick={this._markup && this._markup.undo}
						/>
						<Button
							iconName='repeat'
							onClick={this._markup && this._markup.redo}
						/>
						<Divider />
						<Dropdown
							defaultVal={this.props.defaultFont}
							items={this._fontList}
							onSelect={this._markup && this._markup.setFont}
						/>
						<Dropdown
							defaultVal={this.props.defaultFontSize.toString()}
							items={this._fontSizes}
							onSelect={this._markup && this._markup.setFontSize}
						/>
						<Divider />
						<Dropdown
							defaultVal={"markdown"}
							items={this._modes}
							onSelect={this._markup && this._markup.setMode}
						/>
						<Dropdown
							defaultVal={"solarized-light"}
							items={this._highlights}
							onSelect={this._markup && this._markup.setHighlight}
							style={{
								width: "6rem"
							}}
						/>
						<Button
							iconName='refresh'
							onClick={this._markup && this._markup.refresh}
						/>
					</EditorToolbar>
					<EditorView
						className={this._editorStyles.value}
						disabled={this.props.disabled}
						id={this.id}
						visible={this.props.visible}
					/>
				</EditorContainer>
			</Wrapper>
		);
	}
}

export default Editor;
