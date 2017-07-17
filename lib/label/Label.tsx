// TODO: Add Label documentation

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

	constructor(props: LabelProps) {
		super(props, require('./styles.css'));
		this.state = {
			editable: props.useedit,
			previousText: props.text,
			text: props.text
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.shouldComponentUpdate(props);
	}

	private handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
		this.handleChange(e.target as Element);
	}

	private handleChange(element: Element) {
		if (this.state.editable) {
			const val = element.innerHTML;
			this.setState({
				editable: false,
				previousText: val,
				text: val
			});

			this.props.onChange(val);
		}
	}

	private handleDoubleClick(e: React.MouseEvent<HTMLSpanElement>) {
		if (!this.props.noedit && document != null && window != null) {
			if ('caretRangeFromPoint' in document) {
				const range = document.caretRangeFromPoint(e.clientX, e.clientY);
				const sel = window.getSelection();

				this.setState({
					editable: true
				});

				window.setTimeout(() => {
					sel.removeAllRanges();
					sel.addRange(range);
				}, 20);
			}
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
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === 'Enter') {
			this.handleChange(e.target as Element);
		}
	}

	public shouldComponentUpdate(nextProps: LabelProps): boolean {
		super.resetStyles(nextProps);

		this.classes.push('ui-label');
		this.classes.push(this.styles.label);
		this.classes.push(this.styling.fontStyle);

		super.buildStyles(nextProps, {
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
				style={this.inlineStyle}
				suppressContentEditableWarning
			>
				{this.state.text}
			</span>
		);
	}
}
