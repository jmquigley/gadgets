'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
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

export const LabelComponent = (props: LabelProps) => (
   <span
	   className={props.classes.join(' ')}
	   contentEditable={props.contentEditable}
	   disabled={props.disabled}
	   onBlur={props.onBlur}
	   onClick={props.onClick}
	   onDoubleClick={props.onDoubleClick}
	   onKeyDown={props.onKeyDown}
	   onKeyPress={props.onKeyPress}
	   suppressContentEditableWarning>
	   {props.text}
   </span>
);

export class Label extends React.Component<LabelProps, LabelState> {

	public static defaultProps: LabelProps = getDefaultLabelProps();

	constructor(props: LabelProps) {
		super(props);
		this.state = {
			editable: false,
			previousText: props.text,
			text: props.text
		};
	}

	private handleBlur = (e: Event) => {
		this.handleChange(e.target as Node);
	}

	private handleChange = (node: Node) => {
		if (this.state.editable) {
			let val = node.textContent;
			this.setState({
				editable: false,
				previousText: val,
				text: val
			});

			console.log(`Changed to: ${val}`);
			this.props.onChange(node);
		}
	}

	private handleDoubleClick = (e: MouseEvent) => {
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

	private handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.setState({
				editable: false,
				text: this.state.previousText
			});

			(e.target as Node).textContent = this.state.previousText;
		}
	}

	private handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			this.handleChange(e.target as Node);
		}
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

		l.push(styles.label);
		l.push('ui-label');

		return l;
	}

	render() {
		return (
			<LabelComponent
				{...this.props}
				classes={this.buildClasses()}
				contentEditable={this.state.editable}
				onBlur={(!this.props.disabled) ? this.handleBlur : nil}
				onDoubleClick={(!this.props.disabled) ? this.handleDoubleClick : nil}
				onKeyDown={this.handleKeyDown}
				onKeyPress={this.handleKeyPress}
				text={this.state.text}
			/>
		);
	}
}
