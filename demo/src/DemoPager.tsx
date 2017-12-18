'use strict';

const debug = require('debug')('DemoPager');

import autobind from 'autobind-decorator';
import * as React from 'react';

const {
	Container,
	Pager,
	SortOrder
} = require('../../dist/bundle');

export default class DemoPager extends React.Component<any, undefined> {

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleSelect(page: number) {
		debug(`Clicked on page: ${page}`);
	}

	@autobind
	private handleSort(sortOrder: any) {
		if (sortOrder === SortOrder.ascending) {
			debug(`Sorting pager in ascending`);
		} else {
			debug(`Sorting pager in descending`);
		}
	}

	public render() {
		return (
			<Container id="pagerExample" title="Pager">
				<h3>simple pager</h3>
				<div className="pagerBox">
					<Pager
						initialPage="1"
						totalItems="299"
						sizing={this.props['sizing']}
						onSelect={this.handleSelect}
					/>
				</div>

				<h3>normal, large range, with sort</h3>
				<div className="pagerBox">
					<Pager
						initialPage="1"
						onSelect={this.handleSelect}
						onSort={this.handleSort}
						pageSizes={[25, 50, 100, 500, 1000]}
						pagesToDisplay="5"
						sizing={this.props['sizing']}
						totalItems="30000"
						useinput
					/>
				</div>

				<h3>normal, disabled</h3>
				<div className="pagerBox">
					<Pager
						disabled
						initialPage="1"
						onSelect={this.handleSelect}
						sizing={this.props['sizing']}
						totalItems="299"
					/>
				</div>

			</Container>
		);
	}
}
