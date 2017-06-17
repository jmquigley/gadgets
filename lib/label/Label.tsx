/**
 * {description}
 *
 * #### Examples:
 *
 * ```javascript
 * import {Button} from 'gadgets';
 * <Button iconName="cab" onClick={someFunction} />
 * ```
 *
 * #### Events
 * - `{name}` - {description}
 *
 * #### Styles
 * - `` - {description}
 *
 * #### Properties
 * - `{name}: {datatype}` - {description}
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
	text?: string;
}

export function getDefaultLabelProps(): LabelProps {
	let baseProps = getDefaultBaseProps();

	return cloneDeep(Object.assign(
		baseProps, {
			noedit: false,
			text: " "
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
		super(props, require("./styles.css"));
		this.state = {
			editable: false,
			previousText: props.text,
			text: props.text
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	private handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
		this.handleChange(e.target as Element);
	}

	private handleChange(element: Element) {
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

	private handleDoubleClick(e: React.MouseEvent<HTMLSpanElement>) {
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

	private handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === "Escape") {
			this.setState({
				editable: false,
				text: this.state.previousText
			});

			(e.target as Node).textContent = this.state.previousText;
		}
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLSpanElement>) {
		if (e.key === "Enter") {
			this.handleChange(e.target as Element);
		}
	}

	protected buildStyles() {
		super.buildStyles(this.props, {
			color: (this.props.color || "black"),
			backgroundColor: (this.props.backgroundColor || "white")
		});

		this.classes.push("ui-label");
		this.classes.push(this.styles.label);
	}

	render() {
		this.buildStyles();

		return (
			<span
				className={this.classes.join(" ")}
				contentEditable={this.state.editable}
				disabled={this.props.disabled}
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
