'use strict';

const debug = require('debug')('DemoOptionGroup');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Container,
	OptionGroup
} = require('../../dist/bundle');

export default class DemoOptionGroup extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleSelect(text: string, toggle: boolean) {
		debug('option group item: %o, %o', text, toggle);
	}

	public render() {
		return (
			<Container id="optionGroupExample" title="OptionGroup">
				<OptionGroup
					default="option1"
					onSelect={this.handleSelect}
					options={[
						'option1',
						'option2',
						'option3',
						'option4 this is a longer string'
					]}
					sizing={this.props['sizing']}
					title="test options"
				/>
			</Container>
		);
	}
}
