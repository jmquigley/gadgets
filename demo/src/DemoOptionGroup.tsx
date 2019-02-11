"use strict";

const debug = require("debug")("DemoOptionGroup");

import autobind from "autobind-decorator";
import * as React from "react";
import {OptionGroup} from "../../dist/bundle";
import {StyledContainer} from "../app";

export default class DemoOptionGroup extends React.Component<any, undefined> {
	constructor(props: any) {
		super(props);
		debug("creating");
	}

	@autobind
	private handleSelect(text: string) {
		debug("option group item: %o", text);
	}

	public render() {
		return (
			<StyledContainer id='optionGroupExample' title='OptionGroup'>
				<OptionGroup
					default='option1'
					disabled={this.props["disabled"]}
					onSelect={this.handleSelect}
					options={[
						"option1",
						"option2",
						"option3",
						"option4 this is a longer string"
					]}
					sizing={this.props["sizing"]}
					title='test options'
				/>
			</StyledContainer>
		);
	}
}
