'use strict';

const debug = require('debug')('DemoSwitch');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Break,
	Container,
	Switch,
	SwitchType
} from '../../dist/bundle';

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
					disabled={this.props['disabled']}
					initialToggle={true}
					onClick={this.handleClick}
					sizing={this.props['sizing']}
					switchType={SwitchType.inny}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Outy</h3>
				<Switch
					disabled={this.props['disabled']}
					initialToggle={true}
					onClick={this.handleClick}
					sizing={this.props['sizing']}
					switchType={SwitchType.outy}
				/>
			</Container>
		);
	}
}
