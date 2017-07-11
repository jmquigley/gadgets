// TODO: add documentation for TextField
// TODO: add validation routines for TextField

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {
	validateEmail,
	validateMaxLength,
	validateMinLength,
	validateURL,
	Validator
} from './validator';
import {BaseComponent, Sizing} from '../shared';


export interface TextFieldProps extends Partial<HTMLInputElement> {
	disabled?: boolean;
	onChange?: any;
	sizing?: Sizing;
	type?: string;
	usevalidation?: boolean;
	validators?: Validator[];
	visible?: boolean;
}

export function getDefaultTextFieldProps(): TextFieldProps {
	return cloneDeep({
		disabled: false,
		onChange: nilEvent,
		sizing: Sizing.normal,
		type: 'text',
		usevalidation: false,
		validators: [],
		visible: true
	});
}

export interface TextFieldState {
	message: string;
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
			message: ' '
		}

		this._validators = cloneDeep(props.validators);

		if (textTypes.includes(props.type) && props.usevalidation) {
			if ('maxLength' in props) {
				this._validators.push(validateMaxLength(Number(props.maxLength)));
			}

			if ('minLength' in props) {
				this._validators.push(validateMinLength(Number(props.minLength)))
			}

			switch (props.type) {
				case 'email':
					this._validators.push(validateEmail());
					break;

				case 'url':
					this._validators.push(validateURL());
					break;
			}

			if (props.type === 'email') {

			}


		}

		this.handleChange = this.handleChange.bind(this);

		this.shouldComponentUpdate(props);
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let value: string = (e.target as HTMLInputElement).value;
		let message: string = '';

		if (value !== '' && this.props.usevalidation) {
			this._validators.every((it: Validator) => {

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

		this.setState({message: message}, () => {
			this.props.onChange(e);
		});
	}

	shouldComponentUpdate(nextProps: any): boolean {
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

	render() {
		// Strip out props that the input control cannot recognize or use
		const {
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
					onChange={this.handleChange}
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
