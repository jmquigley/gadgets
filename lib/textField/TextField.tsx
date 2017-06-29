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
 * @module DynamicList
 */

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
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes.push('ui-textfield');
		this.classes.push(this.sizing.fontStyle);
		this.classes.push(this.styles.textField);
	}

	render() {
		this.buildStyles();

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
