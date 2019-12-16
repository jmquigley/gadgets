const debug = require("debug")("DemoPreview");

import autobind from "autobind-decorator";
import * as fs from "fs-extra";
import * as React from "react";
import styled from "styled-components";
import {encoding} from "util.constants";
import {join} from "util.join";
import {
	Break,
	Dropdown,
	DropdownOption,
	Preview,
	PreviewMode
} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export interface DemoPreviewState {
	content: string;
	mode: PreviewMode;
}

export const PreviewStyledContainer: any = styled(StyledContainer)`
	height: 750px;
`;

export default class DemoPreview extends React.Component<
	any,
	DemoPreviewState
> {
	private items: DropdownOption[] = [
		{value: "markdown", label: "markdown"},
		{value: "asciidoc", label: "asciidoc"},
		{value: "restructuredtext", label: "restructuredtext"}
	];

	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			content: this.loadContent(PreviewMode.markdown),
			mode: PreviewMode.markdown
		};
	}

	private loadContent(mode: PreviewMode) {
		const filename = join(process.cwd(), "demo", "samples", `${mode}.txt`);
		return fs.readFileSync(filename, encoding);
	}

	@autobind
	private handleClick(event: any) {
		debug("handleClick in Preview: %O", event);
	}

	@autobind
	private handleChange(_content: string, _html: string) {
		debug("handleChange");
	}

	@autobind
	private handleMarkupModeDropdown(mode: string) {
		this.setState({
			content: this.loadContent(PreviewMode[mode]),
			mode: PreviewMode[mode]
		});
	}

	public render() {
		return (
			<PreviewStyledContainer id='previewExample' title='Preview'>
				<Dropdown
					disabled={this.props["disabled"]}
					initialValue='markdown'
					items={this.items}
					onSelection={this.handleMarkupModeDropdown}
					sizing={this.props["sizing"]}
				/>
				<Break sizing={this.props["sizing"]} />
				<Preview
					content={this.state.content}
					disabled={this.props["disabled"]}
					mode={this.state.mode}
					onChange={this.handleChange}
					onClick={this.handleClick}
				/>
			</PreviewStyledContainer>
		);
	}
}
