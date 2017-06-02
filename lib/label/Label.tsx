'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
import {baseClasses} from '../shared/base';
import {BaseProps, getDefaultBaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface LabelProps extends BaseProps {
	text?: string;
}

export function getDefaultLabelProps(): LabelProps {
	let baseProps = getDefaultBaseProps();

	return cloneDeep(Object.assign(
		baseProps, {
			text: ' '
		}));
}

export interface LabelState {
	editable: boolean;
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
			text: props.text
		};
	}

	private handleBlur = (e: Event) => {
		this.handleChange(e.target as Node);
	}

	private handleChange = (node: Node) => {
		let val = node.textContent;
		this.setState({
			editable: false,
			text: val
		});

		console.log(`Changed to: ${val}`);
		this.props.onChange(node);
	}

	private handleDoubleClick = (e: MouseEvent) => {
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

	private handleKeyPress = (key: KeyboardEvent) => {
		if (key.which === 13) { // enter key
			this.handleChange(key.target as Node);
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
				onKeyPress={this.handleKeyPress}
				text={this.state.text}
			/>
		);
	}
}
