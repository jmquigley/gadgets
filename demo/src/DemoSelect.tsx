'use strict';

const debug = require('debug')('DemoSelect');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Container,
	Select
} = require('../../dist/bundle');

export interface DemoSelectState {
	selectOption: string;
}

export default class DemoSelect extends React.Component<any, DemoSelectState> {

	private selectOptions: any = [
		{ value: 'one', label: 'One' },
		{ value: 'two', label: 'Two' },
		{ value: 'three', label: 'Three' },
		{ value: 'four', label: 'Four' },
		{ value: 'five', label: 'Five' }
	];

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			selectOption: this.selectOptions[0].value
		};
	}

	@autobind
	private handleChange(val: any) {
		if (val != null) {
			debug(`Select click handler: ${JSON.stringify(val)}`);
			this.setState({selectOption: val.value});
		}
	}

	public render() {
		return (
			<Container id="selectExample" title="Select">
				<div className="selectBox">
					<Select
						name="form-field-name"
						value={this.state.selectOption}
						options={this.selectOptions}
						onChange={this.handleChange}
						sizing={this.props['sizing']}
					/>
				</div>
			</Container>
		);
	}
}
