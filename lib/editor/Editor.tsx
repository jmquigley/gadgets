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
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/editor.png" width="80%" />
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
 * - `buttonSizing=Sizing.normal {Sizing}` - Changes the sizing of the buttons
 * on the toolbar.  The default is normal sizing.
 * - `content=""" {string}` - the initial text content for the component
 * - `defaultFont="Fira Code" {string}` - The name of the default editor font
 * - `defaultFontSize=12 {number}` - The size of the font in pixels (px)
 * - `kBold="ctrl+b" {string}` - keyboard combo for setting text to bold
 * - `kbHeader1="ctrl+alt+1" {string}` - keyboard combo for heading 1
 * - `kbHeader2="ctrl+alt+2" {string}` - keyboard combo for heading 2
 * - `kbHeader3="ctrl+alt+3" {string}` - keyboard combo for heading 3
 * - `kbHeader4="ctrl+alt+4" {string}` - keyboard combo for heading 4
 * - `kbHeader5="ctrl+alt+5" {string}` - keyboard combo for heading 5
 * - `kbHeader6="ctrl+alt+6" {string}` - keyboard combo for heading 6
 * - `kbItalic="ctrl+i" {string}` - keyboard combo for setting italic text
 * - `kbMono="ctrl+m" {string}` - keyboard combo for setting mono text
 * - `kbRedo="ctrl+shift+z" {string}` - keyboard combo for redoing previous
 * undo operations.
 * - `kbRefresh="alt+r" {string}` - keyboard combo for refreshing the editor
 * window.  There are still occasional problems reapplying syntax highlights
 * so this will rescan the whole document and reapply formatting.
 * - `kbStrikeThrough="ctrl+shift+t" {string}` keyboard combo for adding
 * a line strike through in the text.
 * - `kbUnderline="ctrl+u" {string}` - keyboard combo for adding an underline
 * to the current text.
 * - `kbUndo="ctrl+z" {string}` - keyboard combo for undoing the previous set
 * of operations.
 * - `resizerWidth=10 {number}` - When the preview mode is turned on a slider is
 * presented between the editor and the preview.  This is the width in pixels
 * of that slider.
 * - `scheme={foreground: "white", background: "black"} {Object}` - the
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
 * - `showPreview=false {boolean}` - When the initial component is created
 * this will determine if the preview pane will be displayed.  it is not
 * by default.
 *
 * @module Editor
 */

const Quill = (global as any).Quill;

import autobind from "autobind-decorator";
import {Markup, MarkupMode} from "quill-markup";
import * as React from "react";
import styled from "styled-components";
import {ClassNames} from "util.classnames";
import {Match} from "util.matches";
import {nilEvent, roundUp} from "util.toolbox";
import {Button} from "../button/Button";
import {ButtonDialog} from "../buttonDialog/ButtonDialog";
import {Divider} from "../divider/Divider";
import {Dropdown, DropdownOption} from "../dropdown/Dropdown";
import {List} from "../list/List";
import {ListItem} from "../list/ListItem";
import {Preview} from "../preview/Preview";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	baseZIndex,
	Color,
	defaultBaseProps,
	Direction,
	DisabledCSS,
	InvisibleCSS,
	parseKeyCombo,
	Sizing,
	Wrapper
} from "../shared";
import {Toolbar} from "../toolbar/Toolbar";

export interface QuillKeyBindings {
	[key: string]: any;
}

export interface EditorProps extends BaseProps {
	background?: string;
	buttonSizing?: Sizing;
	content?: string;
	defaultFont?: string;
	defaultFontSize?: number;
	foreground?: string;
	kbBold?: string;
	kbHeader1?: string;
	kbHeader2?: string;
	kbHeader3?: string;
	kbHeader4?: string;
	kbHeader5?: string;
	kbHeader6?: string;
	kbItalic?: string;
	kbMono?: string;
	kbPreview?: string;
	kbRedo?: string;
	kbRefresh?: string;
	kbStrikeThrough?: string;
	kbUnderline?: string;
	kbUndo?: string;
	onChange?: (text: string) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClickLink?: (match: Match) => void;
	resizerWidth?: number;
	scheme?: any;
	showPreview?: boolean;
}

export interface EditorState extends BaseState {
	content?: string;
	editorWidth?: number;
	previewWidth?: number;
	visiblePreview?: boolean;
	sliderEnabled?: boolean;
	x?: number;
}

const EditorElement: any = styled.div`
	border: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	display: flex;
	height: 100%;
	min-width: inherit;
	width: ${(props: EditorProps) => props.width};
	z-index: ${baseZIndex};

	> .ql-editor {
		min-width: inherit;
		padding: 5px;
		width: 100%;
	}

	${(props: EditorProps) => props.disabled && DisabledCSS}
	${(props: EditorProps) => !props.visible && InvisibleCSS}
`;

const EditorContainer: any = styled.div`
	box-sizing: border-box;
	border-top: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	display: flex;
	flex-direction: column;
	height: inherit;
	min-width: 625px;
	width: inherit;
`;

const EditorToolbar: any = styled(Toolbar)`
	border-right: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	border-left: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	min-width: inh erit;
`;

const EditorView: any = styled.div`
	display: flex;
`;

const SliderElement: any = styled.div`
	background-color: ${(props: EditorProps) => props.theme.backgroundColor};
	border: none;
	border-right: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	cursor: col-resize;
	height: 100%;
	width: ${(props: EditorProps) => props.width};
	z-index: ${baseZIndex + 1};

	${(props: EditorProps) => props.disabled && DisabledCSS}
	${(props: EditorProps) => !props.visible && InvisibleCSS}
`;

const StyledPreview: any = styled(Preview)`
	border: none;
	border-top: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	border-bottom: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	border-right: solid 1px ${(props: EditorProps) => props.theme.borderColor};
	width: ${(props: EditorProps) => props.width};
	z-index: ${baseZIndex};

	${(props: EditorProps) => !props.visible && InvisibleCSS}
`;

export class Editor extends BaseComponent<EditorProps, EditorState> {
	public static readonly defaultProps: EditorProps = {
		...defaultBaseProps,
		buttonSizing: Sizing.normal,
		content: "",
		defaultFont: "Fira Code",
		defaultFontSize: 12,
		kbBold: "ctrl+b",
		kbHeader1: "alt+ctrl+1",
		kbHeader2: "alt+ctrl+2",
		kbHeader3: "alt+ctrl+3",
		kbHeader4: "alt+ctrl+4",
		kbHeader5: "alt+ctrl+5",
		kbHeader6: "alt+ctrl+6",
		kbItalic: "ctrl+i",
		kbMono: "ctrl+m",
		kbPreview: "alt+p",
		kbRedo: "ctrl+shift+z",
		kbRefresh: "alt+r",
		kbStrikeThrough: "ctrl+shift+t",
		kbUnderline: "ctrl+u",
		kbUndo: "ctrl+z",
		onChange: nilEvent,
		onClick: nilEvent,
		onClickLink: nilEvent,
		resizerWidth: 10,
		scheme: {
			background: Color.black,
			foreground: Color.white
		},
		showPreview: false
	};

	private _boundingBox: any; // bounding box rect on editor container
	private _custom: any;
	private _editor: any;
	private _fontList: DropdownOption[] = [];
	private _fontSizes: DropdownOption[] = [];
	private _highlights: DropdownOption[] = [];
	private _keybindings: QuillKeyBindings;
	private _markup: Markup;
	private _modes: DropdownOption[] = [];
	private _refContainer: any;
	private _refEditor: any;
	private _toolbarStyles: ClassNames = new ClassNames("ui-editor-toolbar");

	constructor(props: EditorProps) {
		super("ui-editor", Editor, props, {
			content: props.content,
			editorWidth: 0,
			previewWidth: 0,
			sliderEnabled: false,
			visiblePreview: props.showPreview,
			x: 0
		});

		this.debug('Editor key: "%s"', this.id);
		this.debug("Quill: %O", Quill);

		this._keybindings = this.buildKeyboardHandler();
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

	private buildKeyboardHandler() {
		return {
			bold: {
				...parseKeyCombo(this.props.kbBold),
				handler: this.handleSetBold
			},
			header1: {
				...parseKeyCombo(this.props.kbHeader1),
				handler: this.handleSelect("1")
			},
			header2: {
				...parseKeyCombo(this.props.kbHeader2),
				handler: this.handleSelect("2")
			},
			header3: {
				...parseKeyCombo(this.props.kbHeader3),
				handler: this.handleSelect("3")
			},
			header4: {
				...parseKeyCombo(this.props.kbHeader4),
				handler: this.handleSelect("4")
			},
			header5: {
				...parseKeyCombo(this.props.kbHeader5),
				handler: this.handleSelect("5")
			},
			header6: {
				...parseKeyCombo(this.props.kbHeader6),
				handler: this.handleSelect("6")
			},
			italic: {
				...parseKeyCombo(this.props.kbItalic),
				handler: this.handleSetItalic
			},
			mono: {
				...parseKeyCombo(this.props.kbMono),
				handler: this.handleSetMono
			},
			preview: {
				...parseKeyCombo(this.props.kbPreview),
				handler: this.handlePreview
			},
			redo: {
				...parseKeyCombo(this.props.kbRedo),
				handler: this.handleRedo
			},
			refresh: {
				...parseKeyCombo(this.props.kbRefresh),
				handler: this.handleRefresh
			},
			strikethrough: {
				...parseKeyCombo(this.props.kbStrikeThrough),
				handler: this.handleStrikeThrough
			},
			tab: {
				key: 9,
				handler: function(textRange: any) {
					this.quill.insertText(textRange.index, "    ");
					return false;
				}
			},
			underline: {
				...parseKeyCombo(this.props.kbUnderline),
				handler: this.handleUnderline
			},
			undo: {
				...parseKeyCombo(this.props.kbUndo),
				handler: this.handleUndo
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
	}

	private buildModes() {
		this._modes = this._markup.modes.map((mode: string) => ({
			value: mode,
			label: mode.capitalize()
		}));
	}

	private buildToolbar() {
		return (
			<EditorToolbar
				className={this._toolbarStyles.value}
				noborder
				sizing={this.props.buttonSizing}
			>
				<Button iconName='bold' onClick={this.handleSetBold} />
				<Button iconName='italic' onClick={this.handleSetItalic} />
				<Button iconName='underline' onClick={this.handleUnderline} />
				<Button
					iconName='strikethrough'
					onClick={this.handleStrikeThrough}
				/>
				<Button iconName='code' onClick={this.handleSetMono} />
				<ButtonDialog iconName='header' notriangle>
					<List sizing={Sizing.small} alternating noselect>
						<ListItem
							title='h1'
							onSelection={this.handleSelect("1")}
						/>
						<ListItem
							title='h2'
							onSelection={this.handleSelect("2")}
						/>
						<ListItem
							title='h3'
							onSelection={this.handleSelect("3")}
						/>
						<ListItem
							title='h4'
							onSelection={this.handleSelect("4")}
						/>
						<ListItem
							title='h5'
							onSelection={this.handleSelect("5")}
						/>
						<ListItem
							title='h6'
							onSelection={this.handleSelect("6")}
						/>
					</List>
				</ButtonDialog>
				<Divider />
				<Button iconName='undo' onClick={this.handleUndo} />
				<Button iconName='repeat' onClick={this.handleRedo} />
				<Divider />
				<Dropdown
					initialValue={this.props.defaultFont}
					items={this._fontList}
					onSelection={this._markup && this._markup.setFont}
				/>
				<Dropdown
					initialValue={this.props.defaultFontSize.toString()}
					items={this._fontSizes}
					onSelection={this._markup && this._markup.setFontSize}
				/>
				<Divider />
				<Dropdown
					initialValue={"markdown"}
					items={this._modes}
					onSelection={this._markup && this._markup.setMode}
				/>
				<Dropdown
					initialValue={"solarized-light"}
					items={this._highlights}
					onSelection={this._markup && this._markup.setHighlight}
					style={{
						width: "6rem"
					}}
				/>
				<Button iconName='refresh' onClick={this.handleRefresh} />
			</EditorToolbar>
		);
	}

	@autobind
	private focusEditor() {
		if (this._refEditor) {
			this._refEditor.focus();
		}
	}

	@autobind
	private handleChange(text: string) {
		this.setState({
			content: text
		});

		this.props.onChange(text);
	}

	@autobind
	private handleDisableDragDrop() {
		return false;
	}

	@autobind
	private handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		if (!this.props.disabled && this.state.visiblePreview) {
			this.setState({
				sliderEnabled: true
			});

			this.debug("mouseDown: %O, e: %O", this._refContainer, e);
			e.preventDefault();
		}
	}

	@autobind
	private handleMouseMove(
		e: MouseEvent,
		direction: Direction = Direction.left
	) {
		if (this.state.sliderEnabled) {
			let dx: number = 0;

			// Compute the current location of the slider control based on the mouse
			// moving left over the editor, or right over the Preview component
			if (direction === Direction.left) {
				dx = e.pageX - this._boundingBox.left;
			} else {
				dx = this.state.x + e.pageX;
			}

			let editorWidth: number = dx;
			let previewWidth: number = this._boundingBox.right - dx;

			// Deal with extreme (outside) left/right bourndaries
			if (dx < 0) {
				// past the left side border (no editor, all preview)
				dx = editorWidth = 0;
				previewWidth =
					this._boundingBox.width - this.props.resizerWidth;
			} else if (dx > this._boundingBox.width - this.props.resizerWidth) {
				// past the right side border (no preview, all editor)
				dx = editorWidth =
					this._boundingBox.right - this.props.resizerWidth;
				previewWidth = 0;
			}

			const newState = {
				editorWidth,
				previewWidth,
				x: dx
			};

			/*
			this.debug(
				"handleMouseMove(%o) -> state: %O, newState: %O, e: %O, boundingBox: %O",
				this.state,
				direction,
				newState,
				e,
				this._boundingBox
			);
			*/

			this.setState(newState);
			e.preventDefault();
		}
	}

	@autobind
	private handleMouseMoveLeft(e: MouseEvent) {
		this.handleMouseMove(e, Direction.left);
	}

	@autobind
	private handleMouseMoveRight(e: MouseEvent) {
		this.handleMouseMove(e, Direction.right);
	}

	@autobind
	private handleMouseUp(e: MouseEvent) {
		if (!this.props.disabled && this.state.visiblePreview) {
			this.setState({
				sliderEnabled: false
			});

			this.debug("mouseUp: %O", e);
			e.preventDefault();
		}
	}

	@autobind
	private handlePreview() {
		this.setInitialDimensions(!this.state.visiblePreview);
	}

	@autobind
	private handleRedo() {
		if (this._markup) {
			this._markup.redo();
		}
	}

	@autobind
	private handleRefContainer(ref: any) {
		this._refContainer = ref;
	}

	@autobind
	private handleRefEditor(ref: any) {
		this._refEditor = ref;
	}

	@autobind
	private handleRefresh() {
		if (this._markup) {
			this._markup.refresh();
		}
	}

	@autobind
	private handleResize() {
		this.updateBoundingBox();
		this.setInitialDimensions(this.state.visiblePreview);
	}

	@autobind
	private handleSelect(level: string) {
		return () => {
			if (this._markup) {
				this._markup.setHeader(level);
			}
		};
	}

	@autobind
	private handleSetBold() {
		if (this._markup) {
			this._markup.setBold();
		}
	}

	@autobind
	private handleSetItalic() {
		if (this._markup) {
			this._markup.setItalic();
		}
	}

	@autobind
	private handleSetMono() {
		if (this._markup) {
			this._markup.setMono();
		}
	}

	@autobind
	private handleStrikeThrough() {
		if (this._markup) {
			this._markup.setStrikeThrough();
		}
	}

	@autobind
	private handleUnderline() {
		if (this._markup) {
			this._markup.setUnderline();
		}
	}

	@autobind
	private handleUndo() {
		if (this._markup) {
			this._markup.undo();
		}
	}

	private setInitialDimensions(visiblePreview: boolean) {
		const startX: number = roundUp(this._boundingBox.width / 2.0);

		// Toggle the state of the current preview pane.
		this.setState(
			{
				editorWidth: visiblePreview ? startX : 0,
				previewWidth: this._boundingBox.width - startX,
				visiblePreview,
				x: visiblePreview ? startX : 0
			},
			() => {
				this.focusEditor();
			}
		);
	}

	private updateBoundingBox() {
		if (this._refContainer) {
			this._boundingBox = this._refContainer.getBoundingClientRect();
		}
	}

	public componentDidMount() {
		window.addEventListener("resize", this.handleResize);

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
					onChange: this.handleChange,
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

		this.debug("Quill editor instance (%o)): %O", this.id, this._editor);

		this._markup = this._editor.getModule("markup");
		this._markup.setContent(this.props.content);
		this._markup.refresh();

		this.buildFontList();
		this.buildFontSizes();
		this.buildHighlights();
		this.buildModes();

		const keyboardHandler = this._editor.getModule("keyboard");
		this.debug("keyboardHandler: %O", keyboardHandler);

		// This lifecycle method occurs after render on the first instance.
		// The component can't get some items from the component on the
		// first render pass because its not mounted.  This will force a
		// rerender to ensure things like the font list are updated
		this.forceUpdate();
		this.focusEditor();
	}

	public componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	public componentDidUpdate() {
		this.updateBoundingBox();
	}

	public render() {
		super.render();

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
			<Wrapper {...this.props} name={this.name}>
				<EditorContainer
					className={this.className}
					style={this.state.style}
				>
					{this.buildToolbar()}
					<EditorView
						className='ui-editor-view'
						ref={this.handleRefContainer}
						onBlur={this.handleMouseUp}
					>
						<EditorElement
							className='ui-editor-quill'
							disabled={this.props.disabled}
							id={this.id}
							onMouseMove={this.handleMouseMoveLeft}
							ref={this.handleRefEditor}
							visible={this.props.visible}
							width={
								this.state.visiblePreview
									? `${this.state.editorWidth}px`
									: "100%"
							}
						/>
						<SliderElement
							className='ui-editor-slider'
							left={this.state.x}
							onDragEnd={this.handleDisableDragDrop}
							onDragStart={this.handleDisableDragDrop}
							onMouseDown={this.handleMouseDown}
							onMouseUp={this.handleMouseUp}
							visible={this.state.visiblePreview}
							width={`${this.props.resizerWidth}px`}
						/>
						<StyledPreview
							className='ui-editor-preview'
							content={this.state.content}
							onMouseMove={this.handleMouseMoveRight}
							onMouseUp={this.handleMouseUp}
							visible={this.state.visiblePreview}
							width={`${this.state.previewWidth}px`}
						/>
					</EditorView>
				</EditorContainer>
			</Wrapper>
		);
	}
}

export default Editor;
