'use strict';

const debug = require('debug')('DemoTagList');

import * as React from 'react';

const {
	Break,
	Container,
	TagList
} = require('../../dist/bundle');

export default class DemoTagList extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	public render() {
		return (
			<Container id="tagListExample" title="TagList">

				<h3>Static</h3>
				<TagList
					sizing={this.props['sizing']}
					tags={['one', 'two', 'three']}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Changeable (no sorting)</h3>
				<TagList
					nosort
					sizing={this.props['sizing']}
					tags={['aaa', 'ccc', 'bbb']}
					useinput
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Changeable (sorted)</h3>
				<TagList
					sizing={this.props['sizing']}
					tags={['aaa', 'ccc', 'bbb']}
					useinput
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Disabled</h3>
				<TagList
					disabled
					sizing={this.props['sizing']}
					tags={['one', 'two', 'three']}
					useinput
				/>

		</Container>
		);
	}
}
