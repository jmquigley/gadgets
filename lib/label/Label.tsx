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

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleRef = this.handleRef.bind(this);

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
				this.props.onChange(element);
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

		this.setState({editable: true}, () => {
			this.props.onDoubleClick(e);
		});
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
				ref={this.handleRef}
				style={this.inlineStyle}
				suppressContentEditableWarning
			>
				{this.state.text}
			</span>
		);
	}
}
