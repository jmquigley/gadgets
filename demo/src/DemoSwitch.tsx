'use strict';

const debug = require('debug')('DemoSwitch');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Break,
	Container,
	Switch,
	SwitchType
} = require('../../dist/bundle');

export default class DemoBrowser extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleClick(toggle: boolean) {
		debug(`Switch toggle (outy): ${toggle ? 'on' : 'off'}`);
	}

	public render() {
		return (
			<Container id="switchExample" title="Switch">
				<h3>Inny</h3>
				<Switch
					initialToggle={true}
					onClick={this.handleClick}
					sizing={this.props['sizing']}
					switchType={SwitchType.inny}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Outy</h3>
				<Switch
					initialToggle={true}
					onClick={this.handleClick}
					sizing={this.props['sizing']}
					switchType={SwitchType.outy}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>normal, disabled</h3>
				<Switch
					disabled
					onClick={this.handleClick}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

			</Container>
		);
	}
}
