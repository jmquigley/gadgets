'use strict';

const debug = require('debug')('DemoPager');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Break,
	Pager,
	SortOrder
} from '../../dist/bundle';
import {StyledContainer} from '../app';

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
			<StyledContainer id="pagerExample" title="Pager">
				<h3>simple pager</h3>
				<div className="pagerBox">
					<Pager
						disabled={this.props['disabled']}
						initialPage={1}
						totalItems={299}
						sizing={this.props['sizing']}
						onSelect={this.handleSelect}
					/>
				</div>
				<Break sizing={this.props['sizing']} />

				<h3>normal, large range, with sort</h3>
				<div className="pagerBox">
					<Pager
						disabled={this.props['disabled']}
						initialPage={1}
						onSelect={this.handleSelect}
						onSort={this.handleSort}
						pageSizes={[25, 50, 100, 500, 1000]}
						pagesToDisplay={5}
						sizing={this.props['sizing']}
						totalItems={30000}
						useinput
					/>
				</div>
				<Break sizing={this.props['sizing']} />

			</StyledContainer>
		);
	}
}
