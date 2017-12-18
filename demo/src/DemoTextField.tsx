'use strict';

const debug = require('debug')('DemoTextField');

import * as React from 'react';

const {
	Break,
	Container,
	TextField,
	Validator
} = require('../../dist/bundle');

export default class DemoTextField extends React.Component<any, undefined> {

	private validator: any;

	constructor(props: any) {
		super(props);
		debug('creating');

		this.validator = new Validator(
			(value: string) => {
				return /^[0-9a-zA-Z]+$/.test(value);
			},
			'Not alphanumeric only',
			'Contains only alphanumeric'
		);
	}

	public render() {
		return (
			<Container id="textfieldExample" title="TextField">

				<h3>Validation of Max (10) & Min (5) Length</h3>
				<TextField
					id="tf-validation"
					maxLength="10"
					minLength="5"
					placeholder="validation"
					sizing={this.props['sizing']}
					tooltip="Enter text with length greather than 5 and less than 10"
					usevalidation
				/>

				<h3>Validation of Email</h3>
				<TextField
					placeholder="email validation"
					sizing={this.props['sizing']}
					type="email"
					usevalidation
				/>

				<h3>Validation of URL</h3>
				<TextField
					placeholder="url validation"
					sizing={this.props['sizing']}
					type="url"
					usevalidation
				/>

				<h3>Validation with custom alphanumeric</h3>
				<TextField
					placeholder="custom"
					sizing={this.props['sizing']}
					usevalidation
					validators={[this.validator]}
				/>

				<h3>Search text field</h3>
				<TextField
					placeholder="search"
					sizing={this.props['sizing']}
					style={{
						width: '11em'
					}}
					type="text"
					useclear
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Disabled TextField</h3>
				<TextField
					disabled
					placeholder="disabled"
					sizing={this.props['sizing']}
					type="text"
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Disabled TextFiled with search</h3>
				<TextField
					disabled
					placeholder="disabled"
					sizing={this.props['sizing']}
					type="text"
					useclear
				/>

			</Container>
		);
	}
}
