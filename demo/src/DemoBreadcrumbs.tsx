'use strict';

const debug = require('debug')('DemoBreadcrumbs');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Breadcrumbs,
	Break,
	Container,
	Crumbs
} from '../../dist/bundle';

export default class DemoBrowser extends React.Component<any, undefined> {

	private _items: Crumbs[] = [
		{name: 'name1', uri: 'http://www.example1.com'},
		{name: 'name2', uri: 'http://www.example2.com'},
		{name: 'name3', uri: 'http://www.example3.com'}
	];

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleSelect(name: string, uri: string) {
		debug('selected => name: %s, uri: %s', name, uri);
	}

	public render() {
		return (
			<Container id="breadcrumbsExample" title="Breadcrumbs">
				<h3>Basic (default)</h3>
				<Breadcrumbs
					disabled={this.props['disabled']}
					items={this._items}
					onSelect={this.handleSelect}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Custom icon and chevrons</h3>
				<Breadcrumbs
					chevron="long-arrow-right"
					disabled={this.props['disabled']}
					icon="shower"
					items={this._items}
					onSelect={this.handleSelect}
					sizing={this.props['sizing']}
				/>
				<Break sizing={this.props['sizing']} />

				<h3>Basic with no icon</h3>
				<Breadcrumbs
					disabled={this.props['disabled']}
					items={this._items}
					noicon
					onSelect={this.handleSelect}
					sizing={this.props['sizing']}
				/>
			</Container>
		);
	}
}
