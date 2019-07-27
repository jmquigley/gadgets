const debug = require("debug")("DemoTagList");

import autobind from "autobind-decorator";
import * as React from "react";
import {Break, TagList} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export interface DemoTagState {
	tags1: string;
	tags2: string;
	tagsEmpty?: string;
}

export default class DemoTagList extends React.Component<any, DemoTagState> {
	constructor(props: any) {
		super(props);

		this.state = {
			tags1: "aaa, ccc, bbb",
			tags2: "xxx, yyy, zzz",
			tagsEmpty: null
		};

		debug("creating");
	}

	@autobind
	private handleNew1(tag: string, tags: string[]) {
		debug(`handleNew -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tags1: tags.join(",")
		});
	}

	@autobind
	private handleDelete1(tag: string, tags: string[]) {
		debug(`handleDelete -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tags1: tags.join(",")
		});
	}

	@autobind
	private handleNew2(tag: string, tags: string[]) {
		debug(`handleNew -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tags2: tags.join(",")
		});
	}

	@autobind
	private handleDelete2(tag: string, tags: string[]) {
		debug(`handleDelete -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tags2: tags.join(",")
		});
	}

	@autobind
	private handleNewEmpty(tag: string, tags: string[]) {
		debug(`handleNewEmpty -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tagsEmpty: tags.join(",")
		});
	}

	@autobind
	private handleDeleteEmpty(tag: string, tags: string[]) {
		debug(`handleDeleteEmpty -> tag: %o, tags: %O`, tag, tags);
		this.setState({
			tagsEmpty: tags.join(",")
		});
	}

	public render() {
		return (
			<StyledContainer id='tagListExample' title='TagList'>
				<h3>Empty</h3>
				<TagList
					disabled={this.props["disabled"]}
					onDelete={this.handleDeleteEmpty}
					onNew={this.handleNewEmpty}
					sizing={this.props["sizing"]}
					tags={this.state.tagsEmpty}
					useinput
				/>

				<h3>Static</h3>
				<TagList
					disabled={this.props["disabled"]}
					sizing={this.props["sizing"]}
					tags={["one", "two", "three"]}
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>Changeable (no sorting)</h3>
				<TagList
					disabled={this.props["disabled"]}
					nosort
					onDelete={this.handleDelete1}
					onNew={this.handleNew1}
					sizing={this.props["sizing"]}
					tags={this.state.tags1}
					useinput
				/>
				<Break sizing={this.props["sizing"]} />

				<h3>Changeable (sorted)</h3>
				<TagList
					disabled={this.props["disabled"]}
					onDelete={this.handleDelete2}
					onNew={this.handleNew2}
					sizing={this.props["sizing"]}
					tags={this.state.tags2}
					useinput
				/>
			</StyledContainer>
		);
	}
}
