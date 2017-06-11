'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {baseClasses} from '../shared/base';
import {BaseProps, getDefaultBaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface LabelProps extends BaseProps {
	noedit?: boolean;
	text?: string;
}

export function getDefaultLabelProps(): LabelProps {
	let baseProps = getDefaultBaseProps();

	return cloneDeep(Object.assign(
		baseProps, {
			noedit: false,
			text: ' '
		}));
}

export interface LabelState {
	editable: boolean;
	previousText: string;
	text: string;
}

export class Label extends React.Component<LabelProps, LabelState> {

	public static defaultProps: LabelProps = getDefaultLabelProps();

	private _classes: string = '';
	private _style: any = null;

	constructor(props: LabelProps) {
		super(props);
		this.state = {
			editable: false,
			previousText: props.text,
			text: props.text
		};
	}

	private buildStyles = () => {
		this._style = Object.assign({
			color: (this.props.color || 'black'),
			backgroundColor: (this.props.backgroundColor || 'white')
		}, this.props.style);

		this._classes = baseClasses(this.props);
		this._classes += ` ${styles.label}`;
		this._classes += " ui-label";
	}

	private handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
		this.handleChange(e.target as Element);
	}

	private handleChange = (element: Element) => {
		if (this.state.editable) {
			let val = element.innerHTML;
			this.setState({
				editable: false,
				previousText: val,
				text: val
			});

			console.log(`Changed to: ${val}`);
			this.props.onChange(val);
		}
	}

	private handleDoubleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
		if (!this.props.noedit) {
			let range = document.caretRangeFromPoint(e.clientX, e.clientY);
			let sel = window.getSelection();

			this.setState({
				editable: true
			});

			window.setTimeout(() => {
				sel.removeAllRanges();
				sel.addRange(range);
			}, 20);
		}
	}

	private handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if (e.key === 'Escape') {
			this.setState({
				editable: false,
				text: this.state.previousText
			});

			(e.target as Node).textContent = this.state.previousText;
		}
	}

	private handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
		if (e.key === 'Enter') {
			this.handleChange(e.target as Element);
		}
	}

	render() {
		this.buildStyles();

		return (
			<span
				className={this._classes}
				style={this._style}
				contentEditable={this.state.editable}
				disabled={this.props.disabled}
				onBlur={(!this.props.disabled) ? this.handleBlur : nilEvent}
				onClick={this.props.onClick}
				onDoubleClick={(!this.props.disabled) ? this.handleDoubleClick : nilEvent}
				onKeyDown={this.handleKeyDown}
				onKeyPress={this.handleKeyPress}
				suppressContentEditableWarning>
				{this.state.text}
			</span>
		);
	}
}
