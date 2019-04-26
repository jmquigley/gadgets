/**
 * The TextField is a wrapper component for the built in `<input>` tag.  This
 * control allows the user to add validation routines to the input control
 * beyond the builtin routines.
 *
 * Validations are used by creating an instance of the `Validator` class and
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
 * import {TextField, TextFieldType} from 'gadgets';
 *
 * <TextField
 *     initialValue="abcde"
 *     maxLength="10"
 *     minLength="5"
 *     placeholder="min/max validation"
 *     type={TextFieldType.text}
 *     usevalidation
 * />
 * ```
 *
 * This will create an input control that uses validation.  It will check the
 * width of the string to fall within the min/max range.  When the string is
 * outside of the validation range the red *error* message value will be used
 * too display a message below the control.  When it is within range a green
 * *success* message will be printed below.
 *
 * ##### Custom validator
 * ```javascript
 * import {TextField, TextFieldType, Validator} from 'gadgets';
 *
 * <TextField
 *     placeholder="custom"
 *     type={TextFieldType.text}
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
 * - `disabled=false {boolean}` - When true, the control is disabled
 * - `id='' {string}` - The CSS id for this control
 * - `initialValue='' {string}` - The first value set within the control.
 * This is only done one time when the compoment is constructued.
 * - `max='any' {string}` - the maxium number for a spinner text box.  When
 * set to "any" there is no size.
 * - `min='any' {string}` - the minimum  number for a spinner text box.  When
 * set to "any" there is no size.
 * - `noborder=false {boolean}` - Turns off the border around the component
 * - `sizing=Sizing.normal {Sizing}` - The font size for the control (see
 * the Sizing class in shared).
 * - `step='any' {string} - the increment number for a spinner text box.
 * When this is set to "any" the step is 1 by default.
 * - `type=TextFieldType.text {TextFieldtype}` - The type of input control.
 * This is the type defined by the [HTML input tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).  The
 * value is an enum that maps to these valid types.
 * - `useclear=false {boolean}` - When used it presents a circle "x" button
 * that will clear the current input from the control and set the focus to
 * the input.
 * - `usevalidation=false {boolean}` - If this is true then the validation
 * routines are exectued.
 * - `validators=[] {Validator[]}` - A list of Validator classes.  Each of the
 * classes in this list are used against the input to check if it passes the
 * rules set in that validator function.
 * - `value=undefined {any}` - This is will override whatever is currently in
 * the control.  It should only be used if the parent is going to control the
 * contents of the control.
 * - `visible=true {boolean}` - If set to false this control is hidden (set
 * to a display of none).
 *
 * @module TextField
 */

// const debug = require("debug")("TextField");

import autobind from "autobind-decorator";
import * as React from "react";
import {sp} from "util.constants";
import {nilEvent} from "util.toolbox";
import {ButtonCircle} from "../buttonCircle";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	Color,
	disabled,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	invisible,
	Wrapper
} from "../shared";
import styled, {css} from "../shared/themed-components";
import {tooltip} from "../tooltip";
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateURL,
	Validator
} from "./validator";

export enum MessageType {
	none,
	error,
	success
}

export enum TextFieldType {
	email = "email",
	number = "number",
	spinner = "number",
	string = "text",
	text = "text",
	url = "url"
}

export interface TextFieldProps extends BaseProps {
	initialValue?: any;
	max?: string;
	maxLength?: number | string;
	min?: string;
	minLength?: number | string;
	minWidth?: string;
	noborder?: boolean;
	nospinner?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onValidation?: (valid: boolean) => void;
	size?: number;
	step?: string;
	type?: string;
	useclear?: boolean;
	usevalidation?: boolean;
	validators?: Validator[];
	[key: string]: any;
}

export function getDefaultTextFieldProps(): TextFieldProps {
	return {
		...getDefaultBaseProps(),
		initialValue: "",
		max: "any",
		maxLength: null,
		min: "any",
		minLength: null,
		minWidth: "1em",
		noborder: false,
		noripple: true,
		nospinner: false,
		obj: "TextField",
		onBlur: nilEvent,
		onChange: nilEvent,
		onClear: nilEvent,
		onKeyDown: nilEvent,
		onKeyPress: nilEvent,
		onValidation: nilEvent,
		size: null,
		step: "any",
		type: TextFieldType.text,
		useclear: false,
		usevalidation: false,
		validators: []
	};
}

export interface TextFieldState extends BaseState {
	message: string;
	messageType: MessageType;
	minWidth: string;
	previousValue: string;
	valid: boolean;
	value: any;
}

export function getDefaultTextFieldState(): TextFieldState {
	return {
		...getDefaultBaseState(),
		message: "",
		messageType: MessageType.none,
		minWidth: "",
		previousValue: "",
		valid: true,
		value: ""
	};
}

const textTypes: any[] = ["text", "email", "search", "password", "tel", "url"];

const ClearButtonView: any = styled.div`
	display: inline-flex;
	margin: 0 2px;
	opacity: 0;
	padding: 1px 0;
	transition: opacity ${(props) => props.theme.transitionDelay} ease-in-out;

	${(props) => fontStyle[props["sizing"]]}
`;

const MessageView: any = styled.div`
	background-color: unset;
	border-color: unset;
	color: ${(props) =>
		props["messageType"] !== MessageType.success
			? Color.error
			: Color.success};
	display: block;

	${(props) => disabled(props)}
	${(props) => fontStyle[props["sizing"]]}
	${(props) => invisible(props)}
`;

const noSpinnerCSS: any = css`
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const StyledInput: any = styled.input`
	border: none;
	box-sizing: border-box;
	display: inline-flex;
	font-size: inherit;
	min-height: 0;
	min-width: 0;
	outline: none;
	padding: 1px 4px;
	width: 100%;

	${(props) => props["nospinner"] && noSpinnerCSS}

	${(props) => disabled(props)}
	${(props) => fontStyle[props["sizing"]]}
	${(props) => invisible(props)}
`;

const TextfieldContainerView: any = styled.div`
	display: inline-flex;
	flex-direction: column;
	min-width: ${(props: TextFieldProps) => props.minWidth};
	position: relative;
	width: ${(props: TextFieldProps) => props.width || "100%"};
`;

const TextFieldView: any = styled.div`
	border: ${(props) =>
		props["noborder"]
			? "none"
			: "solid 1px " + props.theme.inputBorderColor};
	display: inherit;
	padding: 1px 0;

	&:hover .ui-textfield-clear-button {
		opacity: ${(props) => (!props["disabled"] ? "1.0;" : "0.0")};
	}
`;

export class TextField extends BaseComponent<TextFieldProps, TextFieldState> {
	public static readonly defaultProps: TextFieldProps = getDefaultTextFieldProps();

	private _input: HTMLInputElement = null;
	private _validators: Validator[] = null;

	constructor(props: TextFieldProps) {
		super(props, "ui-textfield", TextField.defaultProps.style);
		this._validators = props.validators.slice();

		this.state = {
			...getDefaultTextFieldState(),
			previousValue: this.props.initialValue,
			value: this.props.initialValue
		};

		if (textTypes.includes(props.type) && props.usevalidation) {
			if ("maxLength" in props && props["maxLength"]) {
				this._validators.push(
					validateMaxLength(Number(props.maxLength))
				);
			}

			if ("minLength" in props && props["minLength"]) {
				this._validators.push(
					validateMinLength(Number(props.minLength))
				);
			}

			switch (props.type) {
				case TextFieldType.email:
					this._validators.push(validateEmail());
					break;

				case TextFieldType.url:
					this._validators.push(validateURL());
					break;
			}
		}
	}

	get input(): any {
		return this._input;
	}

	private commit(ele: HTMLInputElement) {
		this.setState({previousValue: ele.value}, () => {
			if (this.props.usevalidation) {
				this.props.onValidation(this.validate(ele.value));
			}
		});
	}

	@autobind
	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.commit(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	@autobind
	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).value;
		this.setState({value});
		this.validate(value);
		this.props.onChange(e);
	}

	@autobind
	private handleClearButton() {
		this.setState({
			message: "",
			previousValue: ""
		});

		this.input.value = "";
		this.handleChange({target: this.input} as any);
		this.input.focus();
		this.props.onClear();
	}

	@autobind
	private handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Escape") {
			const value = this.state.previousValue;
			this.setState({value});
			this.validate(value);
		}

		this.props.onKeyDown(e);
	}

	@autobind
	private handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			this.commit(e.target as HTMLInputElement);
		}

		this.props.onKeyPress(e);
	}

	@autobind
	private handleRef(ele: HTMLInputElement) {
		this._input = ele;
	}

	private validate(value: string): boolean {
		let ret: boolean = true;
		let message: string = "";
		let messageType: MessageType = MessageType.none;

		if (value !== "" && this.props.usevalidation) {
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

	public static getDerivedStateFromProps(
		props: TextFieldProps,
		state: TextFieldState
	) {
		if ("value" in props && props.value !== state.value) {
			const newState = {
				...state,
				value: props.value
			};

			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public render() {
		this.updateClassName();

		// Strip out props that the input control cannot recognize or use
		const {validators, onClear, onValidation, ...props} = this.props;

		const minWidth = `${this.props.size / 2.0 + 3}rem`;
		let clearBtn: any = null;

		if (this.props.useclear) {
			clearBtn = (
				<ClearButtonView
					className='ui-textfield-clear-button'
					sizing={BaseComponent.prev().type}
				>
					<ButtonCircle
						disabled={this.props.disabled}
						iconName='times'
						onClick={this.handleClearButton}
						sizing={BaseComponent.prev().type}
						style={{
							backgroundColor: Color.white,
							borderColor: Color.error,
							color: Color.error
						}}
						visible={this.props.visible}
					/>
				</ClearButtonView>
			);
		}

		return (
			<Wrapper {...this.props}>
				<TextfieldContainerView
					className='ui-textfield-container'
					id={this.id}
					minWidth={minWidth}
					width={this.props.width}
				>
					<TextFieldView
						disabled={this.props.disabled}
						className={this.className}
						noborder={this.props.noborder}
						visible={this.props.visible}
					>
						<StyledInput
							{...props}
							ref={this.handleRef}
							onBlur={this.handleBlur}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							onKeyPress={this.handleKeyPress}
							value={this.state.value}
						/>
						{clearBtn}
					</TextFieldView>
					{this.props.usevalidation ? (
						<MessageView
							className='ui-textfield-validation-message'
							disabled={this.props.disabled}
							messageType={this.state.messageType}
							sizing={BaseComponent.prev().type}
							visible={this.props.visible}
						>
							{this.props.usevalidation ? sp : null}
							{this.state.message}
						</MessageView>
					) : null}
					{tooltip(this.id, this.props)}
				</TextfieldContainerView>
			</Wrapper>
		);
	}
}

export default TextField;
