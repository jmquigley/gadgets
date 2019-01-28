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
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/textField.png" width="60%" />
 *
 * ## Examples:
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
 * ```javascript
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
 * ```javascript
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
 * ## API
 * #### Events
 * - `onBlur` - Invoked when focus on control is lost.
 * - `onChange` - Invoked each time a key is pressed.  The validation routine is
 * also called with each key.
 * - `onClear` - Invoked when the clear button is pressed in a search text control
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
 * - `ui-textfield-validation-message` - Placed on the `<div>` used to wrap the
 * validation message when the input contains validation code.
 *
 * #### Properties
 * - `disabled: {boolean} (false)` - When true, the control is disabled
 * - `id: {string} ('')` - The CSS id for this control
 * - `noborder: {boolean} (false)` - Turns off the border around the component
 * - `sizing: {Sizing} (Sizing.normal) - The font size for the control (see
 * the Sizing class in shared).
 * - `type: {string} ('text')` - The type of input control.  This is the type
 * defined by the [HTML input tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
 * - `useclear {boolean} (false)` - When used it presents a circle "x" button
 * that will clear the current input from the control and set the focus to
 * the input.
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

// const debug = require('debug')('TextField');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {sp} from 'util.constants';
import {nilEvent} from 'util.toolbox';
import {ButtonCircle} from '../buttonCircle';
import {
	BaseComponent,
	BaseState,
	Color,
	disabled,
	fontStyle,
	getDefaultBaseState,
	invisible,
	Sizing,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';
import {tooltip} from '../tooltip';
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateURL,
	Validator
} from './validator';

export enum MessageType {
	none,
	error,
	success
}

export interface TextFieldProps extends Partial<HTMLInputElement> {
	disabled?: boolean;
	noborder?: boolean;
	id?: string;
	minWidth?: string;
	onBlur?: any;
	onClear(): void;
	onChange?: any;
	onKeyDown?: any;
	onKeyPress?: any;
	onValidation?: any;
	sizing?: Sizing;
	style?: any;
	tooltip?: string;
	testing?: boolean;
	type?: string;
	useclear?: boolean;
	usevalidation?: boolean;
	validators?: Validator[];
	visible?: boolean;
}

export function getDefaultTextFieldProps(): TextFieldProps {
	return cloneDeep({
		disabled: false,
		id: '',
		minWidth: '1em',
		noborder: false,
		obj: 'TextField',
		onBlur: nilEvent,
		onChange: nilEvent,
		onClear: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onValidation: nilEvent,
		sizing: Sizing.normal,
		style: {},
		testing: process.env.NODE_ENV !== 'production',
		tooltip: '',
		type: 'text',
		useclear: false,
		usevalidation: false,
		validators: [],
		visible: true
	});
}

export interface TextFieldState extends BaseState {
	message: string;
	messageType: MessageType;
	minWidth: string;
	previousText: string;
	valid: boolean;
}

export function getDefaultTextFieldState(): TextFieldState {
	return cloneDeep({...getDefaultBaseState('ui-textfield'),
		message: '',
		messageType: MessageType.none,
		minWidth: '',
		previousText: '',
		valid: true
	});
}

const textTypes: any[] = ['text', 'email', 'search', 'password', 'tel', 'url'];

export const ClearButtonView: any = styled.div`
	display: inline-flex;
	margin: 0 2px;
	opacity: 0;
	padding: 1px 0;
	transition: opacity ${props => props.theme.transitionDelay} ease-in-out;

	${props => fontStyle[props['sizing']]}
`;

export const MessageView: any = styled.div`
	background-color: unset;
	border-color: unset;
	color: ${props => props['messageType'] !== MessageType.success ? Color.error : Color.success};
	display: block;

	${props => disabled(props)}
	${props => fontStyle[props['sizing']]}
	${props => invisible(props)}
`;

export const StyledInput: any = styled.input`
	border: none;
	box-sizing: border-box;
	display: inline-flex;
	font-size: inherit;
	min-height: 0;
	min-width: 0;
	outline: none;
	padding: 1px 5px;
	width: 100%;

	${props => disabled(props)}
	${props => fontStyle[props['sizing']]}
	${props => invisible(props)}
`;

export const TextfieldContainerView: any = styled.div`
	display: inline-flex;
	flex-direction: column;
	min-width: ${(props: TextFieldProps) => props.minWidth};
	position: relative;
`;

export const TextFieldView: any = styled.div`
	border: ${
		props => props['noborder'] ? 'none' : 'solid 1px ' + props.theme.inputBorderColor
	};
	display: inherit;
	padding: 1px 0;

	&:hover .ui-textfield-clear-button {
		opacity: ${props => !props['disabled'] ? '1.0;' : '0.0'};
	}
`;

export class TextField extends BaseComponent<any, TextFieldState> {

	public static readonly defaultProps: TextFieldProps = getDefaultTextFieldProps();
	public state: TextFieldState = getDefaultTextFieldState();

	private _input: HTMLInputElement = null;
	private _validators: Validator[] = null;
	private _value: string = '';

	constructor(props: TextFieldProps) {
		super(props, TextField.defaultProps.style);
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
	}

	get input(): any {
		return this._input;
	}

	get value(): string {
		return this._value;
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.commit(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	@autobind
	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this._value = (e.target as HTMLInputElement).value;
		this.validate(this._value);
		this.props.onChange(e);
	}

	@autobind
	private handleClearButton() {
		this.setState({
			message: '',
			previousText: ''
		}, () => {
			this.input.value = '';
			this.handleChange({target: this.input} as any);
			this.input.focus();
			this.props.onClear();
		});
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Escape') {
			(e.target as HTMLInputElement).value = this.state.previousText;
			this._value = this.state.previousText;
			this.validate(this.state.previousText);
		}

		this.props.onKeyDown(e);
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			this.commit(e.target as HTMLInputElement);
		}

		this.props.onKeyPress(e);
	}

	@autobind
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
		let messageType: MessageType = MessageType.none;

		if (value !== '' && this.props.usevalidation) {
			ret = this._validators.every((it: Validator) => {

				if (it.validate(value)) {
					message = it.success;
					messageType = MessageType.success;
				} else {
					message = it.failure;
					messageType = MessageType.error;
					return false;
				}

				return true;
			});
		}

		this.setState({
			message: message,
			messageType: messageType,
			valid: ret
		});

		return ret;
	}

	public static getDerivedStateFromProps(props: TextFieldProps, state: TextFieldState) {
		const newState: TextFieldState = {...state};

		if ('size' in props) {
			newState.minWidth = `${(props.size / 2.0) + 3}rem`;
		}

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		// Strip out props that the input control cannot recognize or use
		const {
			minWidth,
			noborder,
			onClear,
			onValidation,
			useclear,
			usevalidation,
			validators,
			visible,
			...props
		} = this.props;

		let clearBtn: any = null;
		if (this.props.useclear) {
			clearBtn = (
				<ClearButtonView
					className="ui-textfield-clear-button"
					sizing={BaseComponent.prev().type}
				>
					<ButtonCircle
						disabled={props.disabled}
						iconName="times"
						onClick={this.handleClearButton}
						sizing={BaseComponent.prev().type}
						style={{
							backgroundColor: Color.white,
							borderColor: Color.error,
							color: Color.error
						}}
						visible={visible}
					/>
				</ClearButtonView>
			);
		}

		return (
			<Wrapper {...this.props} >
				<TextfieldContainerView
					className="ui-textfield-container"
					id={this.id}
					minWidth={this.state.minWidth}
				>
					<TextFieldView
						disabled={props.disabled}
						className={this.state.classes.classnames}
						noborder={this.props.noborder}
						visible={visible}
					>
						<StyledInput
							{...props}
							ref={this.handleRef}
							onBlur={this.handleBlur}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							onKeyPress={this.handleKeyPress}
							sizing={props.sizing}
							visible={visible}
						/>
						{clearBtn}
					</TextFieldView>
					{this.props.usevalidation ?
						<MessageView
							className="ui-textfield-validation-message"
							disabled={props.disabled}
							messageType={this.state.messageType}
							sizing={BaseComponent.prev().type}
							visible={visible}
						>
							{this.props.usevalidation ? sp : null}
							{this.state.message}
						</MessageView>
					:
						null
					}
				{tooltip(this.id, this.props)}
				</TextfieldContainerView>
			</Wrapper>
		);
	}
}
