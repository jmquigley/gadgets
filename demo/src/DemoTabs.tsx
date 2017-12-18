'use strict';

const debug = require('debug')('DemoTabs');

import autobind from 'autobind-decorator';
import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';

const {
	Break,
	Container,
	Location,
	Tab,
	TabContainer
} = require('../../dist/bundle');

export default class DemoTabs extends React.Component<any, undefined> {

	private randomText = loremIpsum({units: 'sentences', count: 2, random: null});

	constructor(props: any) {
		super(props);
		debug('creating');
	}

	@autobind
	private handleClose(tab: any) {
		debug(`closing tab: ${tab.props['id']}`);
	}

	@autobind
	private handleRemove(tab: any) {
		debug(`removing %o (id=${tab.props['id']})`, tab);
	}

	@autobind
	private handleSelect(tab: any, previous: any) {
		debug(`new: %o (id=${tab.props['id']}), old: %o (id=${previous.props['id']})`, tab, previous);
	}

	public render() {
		return (
			<Container id="tabControl" title="Tabs">
				<h3>Top</h3>
				<TabContainer maxTabs={5} sizing={this.props['sizing']}>
					<Tab title="tab #1" onClose={this.handleClose}>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onclose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #5" onclose={this.handleClose}>#5<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #6" onclose={this.handleClose}>#6<br/><br/>{this.randomText}</Tab>
				</TabContainer>
				<Break sizing={this.props['sizing']} />

				<h3>Left</h3>
				<TabContainer maxTabs={3} location={Location.left} sizing={this.props['sizing']}>
					<Tab title="tab #1" onClose={this.handleClose}>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onClose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
				</TabContainer>
				<Break sizing={this.props['sizing']}/>

				<h3>Bottom (no navigation)</h3>
				<TabContainer maxTabs={3} location={Location.bottom} nonavigation sizing={this.props['sizing']}>
					<Tab title="tab #1" onClose={this.handleClose}>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onClose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
				</TabContainer>
				<Break sizing={this.props['sizing']} />

				<h3>Right (no navigation, onSelect)</h3>
				<TabContainer
					maxTabs={3}
					location={Location.right}
					nonavigation
					onRemove={this.handleRemove}
					onSelect={this.handleSelect}
					sizing={this.props['sizing']}
				>
					<p>Bad tab type to be ignored</p>
					<Tab title="tab #1" onClose={this.handleClose}>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onClose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
				</TabContainer>
				<Break sizing={this.props['sizing']} />

				<h3>Disabled Tab within container</h3>
				<TabContainer location={Location.bottom} sizing={this.props['sizing']}>
					<Tab title="tab #1" onClose={this.handleClose} disabled>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onClose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
				</TabContainer>
				<Break sizing={this.props['sizing']}/>

				<h3>Disabled Container</h3>
				<TabContainer disabled location={Location.bottom} sizing={this.props['sizing']}>
					<Tab title="tab #1" onClose={this.handleClose}>#1<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #2" onClose={this.handleClose}>#2<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #3" onClose={this.handleClose}>#3<br/><br/>{this.randomText}</Tab>
					<Tab title="tab #4" onClose={this.handleClose}>#4<br/><br/>{this.randomText}</Tab>
				</TabContainer>

			</Container>
		);
	}
}
