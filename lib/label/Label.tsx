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
 * - `focus: {boolean} (false)` - If true, then this control is given the focus
 * - `noedit: {boolean} (false)` - If true, then the control can't be edited
 * - `text: {string} ('')` - the text value associated with the label.
 * - `useedit: {boolean} (false)` - If true, then the control is initially placed in
 * edit mode.
 *
 * @module Label
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {sp} from 'util.constants';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getTheme,
	invisible
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

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
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			noedit: false,
			onBlur: nilEvent,
			onChange: nilEvent,
			onClick: nilEvent,
			onDoubleClick: nilEvent,
			onKeyDown: nilEvent,
			onKeyPress: nilEvent,
			onUpdate: nilEvent,
			text: sp,
			useedit: false
		})
	);
}

export interface LabelState {
	editable: boolean;
	previousText: string;
	text: string;
}

export const LabelView: any = withProps<LabelProps, HTMLSpanElement>(styled.span)`
	background-color: inherit;

	${props => disabled(props)}
	${props => invisible(props)}
	${props => props.sizing && fontStyle[props.sizing]}
`;

export class Label extends BaseComponent<LabelProps, LabelState> {

	public static readonly defaultProps: LabelProps = getDefaultLabelProps();

	private _label: any = null;

	constructor(props: LabelProps) {
		super(props, {}, Label.defaultProps.style);

		this._classes.add(['ui-label']);

		this.state = {
			editable: this.props.useedit,
			previousText: this.props.text,
			text: this.props.text
		};

		this.bindCallbacks(
			'handleBlur',
			'handleChange',
			'handleDoubleClick',
			'handleKeyDown',
			'handleKeyPress',
			'handleRef'
		);

		this.componentWillUpdate(this.props);
	}

	get label() {
		return this._label;
	}

	public componentDidMount() {
		if (this.props.focus) {
			this._label.focus();
		}
	}

	public componentDidUpdate() {
		this.componentDidMount();
	}

	private handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
		this.handleChange(e);
		this.props.onBlur(e);
	}

	private handleChange(e: React.FormEvent<HTMLSpanElement>) {
		const element = (e.target as HTMLSpanElement);

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
		e.stopPropagation();
		e.preventDefault();

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
			this.handleChange(e);
		}

		this.props.onKeyPress(e);
	}

	private handleRef(label: any) {
		this._label = label;
	}

	public componentWillReceiveProps(nextProps: LabelProps) {
		if (this.props.text !== nextProps.text) {
			this.setState({
				editable: nextProps.useedit,
				text: nextProps.text
			});
		}
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<LabelView
					className={this.classes}
					contentEditable={this.state.editable}
					disabled={this.props.disabled}
					innerRef={this.handleRef}
					onBlur={(!this.props.disabled) ? this.handleBlur : nilEvent}
					onClick={this.props.onClick}
					onDoubleClick={(!this.props.disabled) ? this.handleDoubleClick : nilEvent}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					sizing={this.props.sizing}
					style={this.inlineStyles}
					suppressContentEditableWarning
					visible={this.props.visible}
				>
					{this.state.text}
				</LabelView>
			</ThemeProvider>
		);
	}
}
