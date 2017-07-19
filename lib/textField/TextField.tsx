// TODO: add documentation for TextField
// TODO: add validation routines for TextField

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

	private _inputStyles: string[] = [];
	private _messageStyle: string = '';
	private _messageStyles: string[] = [];
	private _validators: Validator[] = null;

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

		this.shouldComponentUpdate(props);
	}

	private handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		this.commit(e.target as HTMLInputElement);
		this.props.onBlur(e);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.validate((e.target as HTMLInputElement).value);
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

	private commit(ele: HTMLInputElement) {
		this.setState({previousText: ele.value}, () => {
			this.props.onValidation(this.validate(ele.value));
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
					this._messageStyle = this.styles.failure;
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
