"use strict";

const debug = require("debug")("DemoTabs");

import autobind from "autobind-decorator";
import * as loremIpsum from "lorem-ipsum";
import * as React from "react";
import {Break, Location, Tab, TabContainer} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoTabs extends React.Component<any, undefined> {
	private randomText = loremIpsum({
		units: "sentences",
		count: 2,
		random: null
	});

	constructor(props: any) {
		super(props);
		debug("creating");
	}

	@autobind
	private handleClose(tab: any) {
		debug(`closing tab: ${tab.props["id"]}`);
	}

	@autobind
	private handleRemove(tab: any) {
		debug(`removing %o (id=${tab.props["id"]})`, tab);
	}

	@autobind
	private handleSelect(tab: any, previous: any) {
		debug(
			`selected: %o (id=${tab.props["id"]}), previous: %o (id=${
				previous.props["id"]
			})`,
			tab.props["title"],
			previous.props["title"]
		);
	}

	public render() {
		return (
			<StyledContainer id='tabControl' title='Tabs'>
				<h3>Top</h3>
				<TabContainer
					disabled={this.props["disabled"]}
					maxTabs={5}
					onRemove={this.handleRemove}
					onSelection={this.handleSelect}
					sizing={this.props["sizing"]}
				>
					<Tab title='tab #1' onClose={this.handleClose}>
						#1
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #2' onClose={this.handleClose}>
						#2
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #3' onClose={this.handleClose}>
						#3
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #4' onClose={this.handleClose}>
						#4
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #5' onClose={this.handleClose}>
						#5
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #6' onClose={this.handleClose}>
						#6
						<br />
						<br />
						{this.randomText}
					</Tab>
				</TabContainer>
				<Break sizing={this.props["sizing"]} />

				<h3>Left</h3>
				<TabContainer
					disabled={this.props["disabled"]}
					location={Location.left}
					maxTabs={3}
					onRemove={this.handleRemove}
					onSelection={this.handleSelect}
					sizing={this.props["sizing"]}
				>
					<Tab title='tab #1' onClose={this.handleClose}>
						#1
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #2' onClose={this.handleClose}>
						#2
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #3' onClose={this.handleClose}>
						#3
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #4' onClose={this.handleClose}>
						#4
						<br />
						<br />
						{this.randomText}
					</Tab>
				</TabContainer>
				<Break sizing={this.props["sizing"]} />

				<h3>Bottom</h3>
				<TabContainer
					disabled={this.props["disabled"]}
					location={Location.bottom}
					maxTabs={5}
					onRemove={this.handleRemove}
					onSelection={this.handleSelect}
					sizing={this.props["sizing"]}
				>
					<Tab title='tab #1' onClose={this.handleClose}>
						#1
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #2' onClose={this.handleClose}>
						#2
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #3' onClose={this.handleClose}>
						#3
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #4' onClose={this.handleClose}>
						#4
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #5' onClose={this.handleClose}>
						#5
						<br />
						<br />
						{this.randomText}
					</Tab>
				</TabContainer>
				<Break sizing={this.props["sizing"]} />

				<h3>Right (nonavigation, noclose)</h3>
				<TabContainer
					disabled={this.props["disabled"]}
					location={Location.right}
					maxTabs={3}
					noclose
					nonavigation
					onRemove={this.handleRemove}
					onSelection={this.handleSelect}
					sizing={this.props["sizing"]}
				>
					<Tab title='tab #1' onClose={this.handleClose}>
						#1
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #2' onClose={this.handleClose}>
						#2
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #3' onClose={this.handleClose}>
						#3
						<br />
						<br />
						{this.randomText}
					</Tab>
					<Tab title='tab #4' onClose={this.handleClose}>
						#4
						<br />
						<br />
						{this.randomText}
					</Tab>
				</TabContainer>
			</StyledContainer>
		);
	}
}
