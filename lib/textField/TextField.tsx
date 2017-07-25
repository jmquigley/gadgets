/**
 * The TextField is a wrapper component for the built in `<input>` tag.  This
 * control allows the user to add validation routines to the input control
 * beyond the builtin routines.
 *
 * Validations are creation by creating an instance of the `Validator` class and
 * implementing a validation funtion, failure message, and success message.
 *
 * Validation is NOT used by default.  It must be declared with a prop named
 * `usevalidation.  The control has five built in validation routines (defined
 * in validator.ts):
 *
 * - max length (when used with the "max" parameter)
 * - min length (when used with the "min" parameter)
 * - email
 * - url
 * - regex
 *
 * #### Examples:
 *
 * ##### Simple
 * ```javascript
 * import {TextField} from 'gadgets';
 *
 * <TextField placeholder="simple" />
 * ```
 * This will create a standard input text box with no validation.
 *
 * ##### Max/Min validator
 * ```
 * import {TextField} from 'gadgets';
 *
 * <TextField
 *     placeholder="min/max validation"
 *     minLength="5"
 *     maxLength="10"
 *     usevalidation
 * />
 * ```
 * This will create an input control that uses validation.  It will check the
 * width of the string to fall within the min/max range.  When the string is
 * outside of the validation range the red *error* message value will be used
 * too display a message below the control.  When it is within range a green
 * *success* message will be printed below.
 *
 * ##### Custom validator
 * ```
 * import {TextField, Validator} from 'gadgets';
 *
 * <TextField
 *     placeholder="custom"
 *     usevalidation
 *     validators={[
 *         new Validator(
 *             (value: string) => {
 *                 return /^[0-9a-zA-Z]+$/.test(value);
 *             },
 *             'Not alphanumeric only',
 *             'Contains only alphanumeric'
 *         )
 *     ]}
 * />
 * ```
 * This will create a control with a custom alphanumeric validation routine.
 *
 * #### Events
 * - `onBlur` - Invoked when focus on control is lost.
 * - `onChange` - Invoked each time a key is pressed.  The validation routine is
 * also called with each key.
 * - `onKeyDown` - Invoked when a key is pressed.  The escape key is checked
 * and if pressed the input is reverted to its previous setting.
 * - `onKeyPress` - Invoked when a key pressed.  When the "Enter" key is pressed
 * validation is performed and the `onValidation` routine is invoked and the
 * results of the validation are sent to the callback.
 * - `onValidation(flag: boolean)` - When enter is pressed this routine is
 * called.  If validation passes, then true is given to the callback.
 *
 * #### Styles
 * - `ui-textfield` - Placed on the `<div>` used to wrap the `<input>` field.
 *
 * #### Properties
 * - `disabled: {boolean} (false)` - When true, the control is disabled
 * - `id: {string} ('')` - The CSS id for this control
 * - `sizing: {Sizing} (Sizing.normal) - The font size for the control (see
 * the Sizing class in shared).
 * - `type: {string} ('text')` - The type of input control.  This is the type
 * defined by the [HTML input tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
 * - `usevalidation: {boolean} (false)` - If this is true then the validation
 * routines are exectued.
 * - `validators: {Validator[]} ([])` - A list of Validator classes.  Each of the
 * classes in this list are used against the input to check if it passes the
 * rules set in that validator function.
 * - `visible: {boolean} (true)` - If set to false this control is hidden (set
 * to a display of none).
 *
 * @module TextField
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseComponent, Sizing} from '../shared';
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateURL,
	Validator
} from './validator';

export interface TextFieldProps extends Partial<HTMLInputElement> {
	disabled?: boolean;
	id?: string;
	onBlur?: any;
	onChange?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onValidation?: any;
	sizing?: Sizing;
	type?: string;
	usevalidation?: boolean;
	validators?: Validator[];
	visible?: boolean;
}

export function getDefaultTextFieldProps(): TextFieldProps {
	return cloneDeep({
		disabled: false,
		id: '',
		onBlur: nilEvent,
		onChange: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onValidation: nilEvent,
		sizing: Sizing.normal,
		type: 'text',
		usevalidation: false,
		validators: [],
		visible: true
	});
}

export interface TextFieldState {
	message: string;
	previousText: string;
	valid: boolean;
}

const textTypes: any[] = ['text', 'email', 'search', 'password', 'tel', 'url'];

export class TextField extends BaseComponent<any, TextFieldState> {

	public static defaultProps: TextFieldProps = getDefaultTextFieldProps();

	private _input: HTMLInputElement = null;
	private _inputStyles: string[] = [];
	private _messageStyle: string = '';
	private _messageStyles: string[] = [];
	private _validators: Validator[] = null;
	private _value: string = '';

	constructor(props: TextFieldProps) {
		super(props, require('./styles.css'));

		this.state = {
			message: '',
			previousText: props.value || '',
			valid: true
		};

		this._validators = cloneDeep(props.validators);

		if (textTypes.includes(props.type) && props.usevalidation) {
			if ('maxLength' in props) {
				this._validators.push(validateMaxLength(Number(props.maxLength)));
			}

			if ('minLength' in props) {
				this._validators.push(validateMinLength(Number(props.minLength)));
			}

			switch (props.type) {
				case 'email':
					this._validators.push(validateEmail());
					break;

				case 'url':
					this._validators.push(validateURL());
					break;
			}
		}

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleRef = this.handleRef.bind(this);

		this.shouldComponentUpdate(props);
	}

	get input(): any {
		return this._input;
	}

	get value(): string {
		return this._value;
	}

	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.commit(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this._value = (e.target as HTMLInputElement).value;
		this.validate(this._value);
		this.props.onChange(e);
	}

	private handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Escape') {
			(e.target as HTMLInputElement).value = this.state.previousText;
			this.validate(this.state.previousText);
		}

		this.props.onKeyDown(e);
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			this.commit(e.target as HTMLInputElement);
		}

		this.props.onKeyPress(e);
	}

	private handleRef(ele: HTMLInputElement) {
		this._input = ele;
	}

	private commit(ele: HTMLInputElement) {
		this.setState({previousText: ele.value}, () => {
			if (this.props.usevalidation) {
				this.props.onValidation(this.validate(ele.value));
			}
		});
	}

	private validate(value: string): boolean {
		let ret: boolean = true;
		let message: string = '';

		if (value !== '' && this.props.usevalidation) {
			ret = this._validators.every((it: Validator) => {

				if (it.validate(value)) {
					message = it.success;
					this._messageStyle = this.styles.success;
				} else {
					message = it.failure;
					this._messageStyle = this.styles.error;
					return false;
				}

				return true;
			});
		}

		this.setState({
			message: message,
			valid: ret
		});

		return ret;
	}

	public shouldComponentUpdate(nextProps: any): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-textfield');
		this.classes.push(this.styles.textField);

		this._inputStyles = [];
		this._inputStyles.push(this.styling.fontStyle);
		this._inputStyles.push(this.styles.textFieldInput);

		this._messageStyles = [];
		this._messageStyles.push(this._messageStyle);
		this._messageStyles.push(this.styles.textFieldMessage);
		this._messageStyles.push(this.styling.prev.font.style);

		if (nextProps.disabled) {
			this._inputStyles.push(this.styles.disabled);
			this._messageStyles.push(this.styles.disabled);
		}

		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		// Strip out props that the input control cannot recognize or use
		const {
			onValidation,
			sizing,
			usevalidation,
			validators,
			visible,
			...props
		} = this.props;

		return (
			<div className={this.classes.join(' ')}>
				<input
					{...props}
					className={this._inputStyles.join(' ')}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					ref={this.handleRef}
				/>
					{this.props.usevalidation
					?
						<div className={this._messageStyles.join(' ')}>
							{this.props.usevalidation ? '\u00a0' : null}
							{this.state.message}
						</div>
					:
						null
					}
			</div>
		);
	}
}
