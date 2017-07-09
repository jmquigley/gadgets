// TODO: add documentation for TextField
// TODO: add validation routines for TextField

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, Sizing} from '../shared';

export interface ValidatorFn {
	(text: string): boolean;
}

export interface Validator {
	fn: ValidatorFn;
	success: string;
	failure: string;
}

export interface TextFieldProps extends Partial<HTMLInputElement> {
	disabled?: boolean;
	sizing?: Sizing;
	validators?: Validator[];
	visible?: boolean;
}

export function getDefaultTextFieldProps(): TextFieldProps {
	return cloneDeep({
		disabled: false,
		id: '',
		visible: true,
		validators: []
	});
}

export interface TextFieldState {
}

export class TextField extends BaseComponent<any, TextFieldState> {

	public static defaultProps: TextFieldProps = getDefaultTextFieldProps();

	constructor(props: TextFieldProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: any): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-textfield');
		this.classes.push(this.styling.fontStyle);
		this.classes.push(this.styles.textField);
		super.buildStyles(nextProps);
		return true;
	}

	render() {
		// Strip out props that the input control cannot recognize or use
		const {
			sizing,
			validators,
			visible,
			...props
		} = this.props;

		return (
			<input
				{...props}
				className={this.classes.join(' ')}
			/>
		);
	}
}
