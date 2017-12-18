'use strict';

const debug = require('debug')('DemoDropdown');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Break,
	Container,
	Dropdown
} = require('../../dist/bundle');

export default class DemoDropdown extends React.Component<any, undefined> {

	private items: any = [
		{value: 'idstr1', label: 'lstr1'},
		{value: 'idstr2', label: 'lstr2'},
		{value: 'idstr3', label: 'lstr3'}
	];

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleDebugDropdown(val: string) {
		debug('dropdown selected: %s', val);
	}

	public render() {
		return(
			<Container id="dropdownExample" title="Dropdown">

				<h3>Simple Dropdown</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>disabled</h3>
				<Dropdown
					defaultVal="idstr2"
					disabled
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

			</Container>
		);
	}
}
