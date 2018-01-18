'use strict';

const debug = require('debug')('DemoDropdown');

import autobind from 'autobind-decorator';
import * as React from 'react';

import {
	Container,
	Dropdown,
	DropdownOption
} from '../../';

export default class DemoDropdown extends React.Component<any, undefined> {

	private items: DropdownOption[] = [
		{value: 'idstr1', label: 'lstr1'},
		{value: 'idstr2', label: 'lstr2'},
		{value: 'idstr3', label: 'lstr3'},
		{value: 'idstr4', label: 'lstr4'},
		{value: 'idstr5', label: 'lstr5'}
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
				<Dropdown
					defaultVal="idstr2"
					disabled={this.props['disabled']}
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={this.props['sizing']}
				/>
			</Container>
		);
	}
}
