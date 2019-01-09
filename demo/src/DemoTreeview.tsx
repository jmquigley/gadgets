'use strict';

const debug = require('debug')('DemoTreeview');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Container,
	Treeview,
	TreeviewItem
} from '../../dist/bundle';

export interface DemoTreeviewState {
	treeData: TreeviewItem[];
}

export default class DemoTreeview extends React.Component<any, DemoTreeviewState> {

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			treeData: [
				{title: '1.0', expanded: true, children: [
					{title: '1.1'},
					{title: '1.2'},
					{title: '1.3'}
				]},
				{title: '2.0', expanded: true, children: [
					{title: '2.1'},
					{title: '2.2'},
					{title: '2.3'}
				]},
				{title: '3.0', expanded: true, children: [
					{title: '3.1'},
					{title: '3.2'},
					{title: '3.3'}
				]}
			]
		};
	}

	@autobind
	private handleChange(treeData: any) {
		debug('changing tree: %O', treeData);
		this.setState({treeData});
	}

	public render() {
		return (
			<Container id="treeviewExample" title="Treeview">
				<Treeview
					disabled={this.props['disabled']}
					onChange={this.handleChange}
					sizing={this.props['sizing']}
					treeData={this.state.treeData}
				/>
			</Container>
		);
	}
}
