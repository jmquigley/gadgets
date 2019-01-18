'use strict';

const debug = require('debug')('DemoLabels');

import * as React from 'react';
import {
	Break,
	Container,
	Label
} from '../../dist/bundle';

export default class DemoLabels extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	public render() {
		return (
			<Container id="labelExample" title="Labels">
				<div id="simple-labels">
					<Label
						disabled={this.props['disabled']}
						sizing={this.props['sizing']}
						text="Test Label #1 (double click to edit)"
					/>
					<Break sizing={this.props['sizing']} />

					<Label
						className="demoLabel"
						disabled={this.props['disabled']}
						text="Test Label #2 Styled"
						sizing={this.props['sizing']}
					/>
					<Break sizing={this.props['sizing']} />

					<Label
						disabled={this.props['disabled']}
						noedit
						sizing={this.props['sizing']}
						text="Text Label #3 (no edit)"
					/>
					<Break sizing={this.props['sizing']} />

					<Label
						disabled={this.props['disabled']}
						sizing={this.props['sizing']}
						style={{
							color: 'white',
							backgroundColor: 'blue'
						}}
						text="Text Label #4 (inline style)"
					/>
				</div>
			</Container>
		);
	}
}
