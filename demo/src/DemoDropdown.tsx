'use strict';

const debug = require('debug')('DemoDropdown');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Container,
	Dropdown,
	Sizing
} = require('../../dist/bundle');

export default class DemoBadge extends React.Component<any, undefined> {

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
				<h3>xxsmall</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.xxsmall}
				/>
				<br />

				<h3>xsmall</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.xsmall}
				/>
				<br />

				<h3>small</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.small}
				/>
				<br />

				<h3>normal</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
				/>
				<br />

				<h3>large</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.large}
				/>
				<br />

				<h3>xlarge</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.xlarge}
				/>
				<br />

				<h3>xxlarge</h3>
				<Dropdown
					defaultVal="idstr2"
					items={this.items}
					onSelect={this.handleDebugDropdown}
					sizing={Sizing.xxlarge}
				/>
				<br />

				<h3>disabled</h3>
				<Dropdown
					defaultVal="idstr2"
					disabled
					items={this.items}
					onSelect={this.handleDebugDropdown}
				/>
				<br />

			</Container>
		);
	}
}
