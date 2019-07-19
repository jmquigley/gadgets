const debug = require("debug")("DemoTagList");

import autobind from "autobind-decorator";
import * as React from "react";
import {Break, TagList} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoTagList extends React.Component<any, undefined> {
	constructor(props: any) {
		super(props);
		debug("creating");
	}

	@autobind
	private handleNew(tag: string, tags: string[]) {
		debug(`handleNew -> tag: %o, tags: %O`, tag, tags);
	}

	@autobind
	private handleDelete(tag: string, tags: string[]) {
		debug(`handleDelete -> tag: %o, tags: %O`, tag, tags);
	}

	public render() {
		return (
			<StyledContainer id='tagListExample' title='TagList'>
				<h3>Static</h3>
				<TagList
					disabled={this.props["disabled"]}
					onDelete={this.handleDelete}
					onNew={this.handleNew}
					sizing={this.props["sizing"]}
					tags={["one", "two", "three"]}
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>Changeable (no sorting)</h3>
				<TagList
					disabled={this.props["disabled"]}
					nosort
					onDelete={this.handleDelete}
					onNew={this.handleNew}
					sizing={this.props["sizing"]}
					tags={["aaa", "ccc", "bbb"]}
					useinput
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>Changeable (sorted)</h3>
				<TagList
					disabled={this.props["disabled"]}
					onDelete={this.handleDelete}
					onNew={this.handleNew}
					sizing={this.props["sizing"]}
					tags={["aaa", "ccc", "bbb"]}
					useinput
				/>
			</StyledContainer>
		);
	}
}
