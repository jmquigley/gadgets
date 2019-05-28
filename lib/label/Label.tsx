/**
 * A text label string control that can be edited.  The label can be double
 * clicked to enter editint mode (similar to a text field).  This behavior can
 * also be suppressed to make the text static.  The contorl is a `<span>`
 * element surrounding text.
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/label.png" width="30%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Label} from 'gadgets';
 *
 * <Label
 *     focus
 *     text="label text"
 * />
 * ```
 *
 * ## API
 * #### Events
 * - `onBlur` - Invoked when the focus moves away from the label
 * - `onChange(val: string)` - Invoked when a label is changed.  This happens
 * when editing the control and pressing enter or losing focus (blur).
 * - `onClick` - Invoked when the label is clicked.
 * - `onDoubleClick` - Invoked when the user double clicks on the control.  This
 * will cause the control to enter an editing mode.
 * - `onKeyDown` - Invoked when a key is initially pressed.  This captures the
 * "escape" key and reverts the text to its previous state if in edit mode.
 * - `onKeyPress' - Invoked when a key is pressed.  This captures the "Enter"
 * key to commit a user edit to the text of the control if editing.
 * - onUpdate(previous: string, text: string)` - Invoked when the label is
 * changed from one value to another.  The previous text and new text are passed
 * to the callback.
 *
 * #### Styles
 * - `ui-label` - Applied to the surrounding `<span>` element for all labels
 *
 * #### Properties
 * - `defaultText: {string} ('default')` - If the text is fully deleted from the
 * label, then this text is put in as a placeholder.
 * - `focus: {boolean} (false)` - If true, then this control is given the focus
 * - `noedit: {boolean} (false)` - If true, then the control can't be edited
 * - `text: {string} ('')` - the text value associated with the label.
 * - `useedit: {boolean} (false)` - If true, then the control is initially placed in
 * edit mode.
 *
 * @module Label
 */

// const debug = require('debug')('gadgets.Label');

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {sp} from "util.constants";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";

export interface LabelProps extends BaseProps {
	defaultText?: string;
	noedit?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLSpanElement>) => void;
	onChange?: (e: React.FormEvent<HTMLSpanElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
	onDoubleClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLSpanElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLSpanElement>) => void;
	onUpdate?: (previous: string, val: string) => void;
	text?: string | number;
	useedit?: boolean;
}

export function getDefaultLabelProps(): LabelProps {
	return {
		...getDefaultBaseProps(),
		defaultText: "default",
		noedit: false,
		nopropagation: true,
		obj: "Label",
		onBlur: nilEvent,
		onChange: nilEvent,
		onClick: nilEvent,
		onDoubleClick: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onUpdate: nilEvent,
		text: sp,
		useedit: false
	};
}

export interface LabelState extends BaseState {
	editable: boolean;
	originalText: string;
	previousText: string;
	text: string;
}

export function getDefaultLabelState(): LabelState {
	return {
		...getDefaultBaseState(),
		editable: false,
		originalText: "",
		previousText: "",
		text: ""
	};
}

const LabelView: any = styled.span`
	background-color: inherit;
	display: inline-flex;
	flex-grow: 1;

	:empty:before {
    	content: "${sp}";
	}

	${(props: LabelProps) => disabled(props)}
	${(props: LabelProps) => invisible(props)}
	${(props: LabelProps) => props.sizing && fontStyle[props.sizing]}
`;

export class Label extends BaseComponent<LabelProps, LabelState> {
	public static readonly defaultProps: LabelProps = getDefaultLabelProps();
	private _label: any = null;

	constructor(props: LabelProps) {
		super(props, "ui-label", Label.defaultProps.style);
		this.state = {
			...getDefaultLabelState(),
			editable: props.useedit,
			originalText: String(props.text),
			previousText: String(props.text),
			text: String(props.text)
		};
	}

	get label() {
		return this._label;
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
		if (!this.props.disabled && this.props.visible) {
			this.handleChange(e);
			this.props.onBlur(e);
		}
	}

	@autobind
	private handleChange(e: React.FormEvent<HTMLSpanElement>) {
		if (!this.props.disabled && this.props.visible) {
			const element = e.target as HTMLSpanElement;

			if (this.state.editable) {
				const previous = this.state.previousText;
				let val: string;

				if (this.props.testing) {
					// special case for testing with JSDOM
					val = element.innerHTML;
					if (val.length === 0) {
						val = element.innerHTML = this.props.defaultText;
					}
				} else {
					val = element.textContent.trim();
					if (val.length === 0) {
						val = element.textContent = this.props.defaultText;
					}
				}

				this.setState(
					{
						editable: false,
						previousText: val,
						text: val
					},
					() => {
						this.props.onChange(e);
						this.props.onUpdate(previous, val);
					}
				);
			}
		}
	}

	@autobind
	private handleDoubleClick(e: React.MouseEvent<HTMLSpanElement>) {
		if (!this.props.disabled && !this.props.noedit) {
			if (this.props.nopropagation) {
				e.stopPropagation();
				e.preventDefault();
			}

			if (document != null && window != null) {
				if ("caretRangeFromPoint" in document) {
					const range = document.caretRangeFromPoint(
						e.clientX,
						e.clientY
					);
					const sel = window.getSelection();

					window.setTimeout(() => {
						sel.removeAllRanges();
						sel.addRange(range);
					}, 20);
				}
			}

			this.setState({editable: true}, () => {
				this.props.onDoubleClick(e);
			});
		}
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === "Escape") {
			this.setState({
				editable: false,
				text: this.state.previousText
			});

			(e.target as Node).textContent = this.state.previousText;
		}

		this.props.onKeyDown(e);
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === "Enter") {
			this.handleChange(e);
		}

		this.props.onKeyPress(e);
	}

	@autobind
	private handleRef(label: any) {
		this._label = label;
	}

	public componentDidMount() {
		if (this.props.focus) {
			this._label.focus();
		}
	}

	public componentDidUpdate() {
		this.componentDidMount();
	}

	public static getDerivedStateFromProps(
		props: LabelProps,
		state: LabelState
	) {
		const newState: LabelState = {...state};

		if (String(props.text) !== state.originalText) {
			newState.previousText = newState.text;
			newState.text = String(props.text);
			newState.originalText = String(props.text);
		}

		return super.getDerivedStateFromProps(props, newState, true);
	}

	public render() {
		this.updateClassName();

		return (
			<Wrapper {...this.props}>
				<LabelView
					className={this.className}
					contentEditable={this.state.editable}
					disabled={this.props.disabled}
					ref={this.handleRef}
					onBlur={this.handleBlur}
					onClick={this.props.onClick}
					onDoubleClick={this.handleDoubleClick}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					ripple={this.props.ripple}
					sizing={this.props.sizing}
					style={this.state.style}
					suppressContentEditableWarning
					visible={this.props.visible}
				>
					{this.state.text}
				</LabelView>
			</Wrapper>
		);
	}
}

export default Label;
