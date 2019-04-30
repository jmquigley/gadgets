"use strict";

const debug = require("debug")("DemoTextField");

import * as React from "react";
import {Break, TextField, TextFieldType, Validator} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoTextField extends React.Component<any, undefined> {
	private validator: any;

	constructor(props: any) {
		super(props);
		debug("creating");

		this.validator = new Validator(
			(value: string) => {
				return /^[0-9a-zA-Z]+$/.test(value);
			},
			"Not alphanumeric only",
			"Contains only alphanumeric"
		);
	}

	public render() {
		return (
			<StyledContainer id='textfieldExample' title='TextField'>
				<h3>Simple TextField (width 200px)</h3>
				<TextField
					disabled={this.props["disabled"]}
					initialValue='test value'
					sizing={this.props["sizing"]}
					width='200px'
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>Validation of Max (10) & Min (5) Length</h3>
				<TextField
					disabled={this.props["disabled"]}
					id='tf-validation'
					maxLength='10'
					minLength='5'
					placeholder='validation'
					sizing={this.props["sizing"]}
					tooltip='Enter text with length greather than 5 and less than 10'
					type={TextFieldType.text}
					usevalidation
				/>

				<h3>Validation of Email</h3>
				<TextField
					disabled={this.props["disabled"]}
					initialValue='foo@example.com'
					placeholder='email validation'
					sizing={this.props["sizing"]}
					type={TextFieldType.email}
					usevalidation
				/>

				<h3>Validation of URL</h3>
				<TextField
					disabled={this.props["disabled"]}
					placeholder='url validation'
					sizing={this.props["sizing"]}
					type={TextFieldType.url}
					usevalidation
				/>

				<h3>Validation with custom alphanumeric</h3>
				<TextField
					disabled={this.props["disabled"]}
					placeholder='custom'
					sizing={this.props["sizing"]}
					usevalidation
					validators={[this.validator]}
				/>

				<h3>Search text field</h3>
				<TextField
					disabled={this.props["disabled"]}
					placeholder='search'
					sizing={this.props["sizing"]}
					type={TextFieldType.text}
					useclear
					width='200px'
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>TextField with spinner (1-20, start 5)</h3>
				<TextField
					disabled={this.props["disabled"]}
					initialValue='5'
					max='20'
					min='1'
					placeholder='spinner'
					sizing={this.props["sizing"]}
					type={TextFieldType.spinner}
					width='200px'
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>TextField as number, no spinner</h3>
				<TextField
					disabled={this.props["disabled"]}
					initialValue='5'
					max='20'
					min='1'
					nospinner
					placeholder='spinner'
					sizing={this.props["sizing"]}
					type={TextFieldType.spinner}
					width='200px'
				/>
			</StyledContainer>
		);
	}
}
