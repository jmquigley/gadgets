"use strict";

const debug = require("debug")("DemoEditor");

import * as fs from "fs";
import * as React from "react";
import {join} from "util.join";
import {Editor} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoEditor extends React.Component<any, undefined> {
	private markdown: string;

	constructor(props: any) {
		super(props);
		debug("creating");

		this.markdown = fs.readFileSync(
			join(process.cwd(), "demo", "samples", "markdown.txt"),
			"utf8"
		);
	}

	public render() {
		return (
			<StyledContainer id='editorExample' title='Editor'>
				<p>To show the preview panel for the component use ALT+P</p>

				<Editor content={this.markdown} scheme={{bold: "red"}} />
			</StyledContainer>
		);
	}
}
