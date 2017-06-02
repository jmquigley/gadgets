'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {BaseProps, getDefaultBaseProps} from '../shared/props';

const styles = require('./styles.css');

export interface LabelProps extends BaseProps {
	text?: string;
}

export interface LabelState {
	editable: boolean;
	text?: string;
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

	public static defaultProps: LabelProps = getDefaultBaseProps();

	constructor(props: LabelProps) {
		super(props);
		this.state = {
			editable: false,
			text: props.text
		};
	}

	handleBlur = (e: Event) => {
		this.handleChange(e.target as Node);
	}

	handleChange = (node: Node) => {
		let val = node.textContent;
		this.setState({
			editable: false,
			text: val
		});

		console.log(`Changed to: ${val}`);
	}

	handleDoubleClick = (e: MouseEvent) => {
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

	handleKeyPress = (key: KeyboardEvent) => {
		if (key.which === 13) { // enter key
			this.handleChange(key.target as Node);
			this.props.onChange(key);
		}
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}

		l.push(styles.label);
		l.push('ui-label');

		if (!this.props.visible) {
			l.push(styles.invisible);
		}

		if (this.props.disabled) {
			l.push(styles.disabled);
			l.push('nohover');
		}

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
