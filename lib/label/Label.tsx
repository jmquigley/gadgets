/**
 * A text label string control that can be edited.  The label can be double
 * clicked to enter editint mode (similar to a text field).  This behavior can
 * also be suppressed to make the text static.  The contorl is a `<span>`
 * element surrounding text.
 *
 * #### Examples:
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
 * - `focus: {boolean} (false)` - If true, then this control is given the focus
 * - `noedit: {boolean} (false)` - If true, then the control can't be edited
 * - `text: {string} ('')` - the text value associated with the label.
 * - `useedit: {string} ('')` - If true, then the control is initially placed in
 * edit mode.
 *
 * @module Label
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseComponent} from '../shared/base';
import {BaseProps, getDefaultBaseProps} from '../shared/props';

export interface LabelProps extends BaseProps {
	noedit?: boolean;
	onBlur?: any;
	onChange?: any;
	onClick?: any;
	onDoubleClick?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onUpdate?: any;
	text?: string;
	useedit?: boolean;
}

export function getDefaultLabelProps(): LabelProps {
	const baseProps = getDefaultBaseProps();

	return cloneDeep(Object.assign(
		baseProps, {
			noedit: false,
			onBlur: nilEvent,
			onChange: nilEvent,
			onClick: nilEvent,
			onDoubleClick: nilEvent,
			onKeyDown: nilEvent,
			onKeyPress: nilEvent,
			onUpdate: nilEvent,
			text: ' ',
			useedit: false
		}));
}

export interface LabelState {
	editable: boolean;
	previousText: string;
	text: string;
}

export class Label extends BaseComponent<LabelProps, LabelState> {

	public static defaultProps: LabelProps = getDefaultLabelProps();

	private _label: any = null;

	constructor(props: LabelProps) {
		super(props, require('./styles.css'));
		this.state = {
			editable: props.useedit,
			previousText: props.text,
			text: props.text
		};

		this.bindCallbacks(
			'handleBlur',
			'handleChange',
			'handleDoubleClick',
			'handleKeyDown',
			'handleKeyPress',
			'handleRef'
		);

		this.shouldComponentUpdate(props);
	}

	get label() {
		return this._label;
	}

	public componentDidMount() {
		if (this.props.focus) {
			this._label.focus();
		}
	}

	private handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
		this.handleChange(e.target as Element);
		this.props.onBlur(e);
	}

	private handleChange(element: Element) {
		if (this.state.editable) {
			const val = element.innerHTML;
			const previous = this.state.previousText;

			this.setState({
				editable: false,
				previousText: val,
				text: val
			}, () => {
				this.props.onChange(val);
				this.props.onUpdate(previous, val);
			});
		}
	}

	private handleDoubleClick(e: React.MouseEvent<HTMLSpanElement>) {
		if (!this.props.noedit && document != null && window != null) {
			if ('caretRangeFromPoint' in document) {
				const range = document.caretRangeFromPoint(e.clientX, e.clientY);
				const sel = window.getSelection();

				window.setTimeout(() => {
					sel.removeAllRanges();
					sel.addRange(range);
				}, 20);
			}
		}

		if (!this.props.noedit) {
			this.setState({editable: true}, () => {
				this.props.onDoubleClick(e);
			});
		}
	}

	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Escape') {
			this.setState({
				editable: false,
				text: this.state.previousText
			});

			(e.target as Node).textContent = this.state.previousText;
		}

		this.props.onKeyDown(e);
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Enter') {
			this.handleChange(e.target as Element);
		}

		this.props.onKeyPress(e);
	}

	private handleRef(label: any) {
		this._label = label;
	}

	public componentWillReceiveProps(nextProps: LabelProps) {
		if (this.props.text !== nextProps.text) {
			this.setState({
				text: nextProps.text
			});
		}
	}

	public shouldComponentUpdate(nextProps: LabelProps): boolean {
		this.resetStyles(nextProps);

		this.classes.push('ui-label');
		this.classes.push(this.styles.label);
		this.classes.push(this.styling.fontStyle);

		this.buildStyles(nextProps, {
			color: nextProps.color,
			backgroundColor: nextProps.backgroundColor
		});

		return true;
	}

	public render() {
		return (
			<span
				className={this.classes.join(' ')}
				contentEditable={this.state.editable}
				onBlur={(!this.props.disabled) ? this.handleBlur : nilEvent}
				onClick={this.props.onClick}
				onDoubleClick={(!this.props.disabled) ? this.handleDoubleClick : nilEvent}
				onKeyDown={this.handleKeyDown}
				onKeyPress={this.handleKeyPress}
				ref={this.handleRef}
				style={this.inlineStyle}
				suppressContentEditableWarning
			>
				{this.state.text}
			</span>
		);
	}
}
