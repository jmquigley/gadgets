"use strict";

const debug = require("debug")("DemoOption");

import autobind from "autobind-decorator";
import {EnumValues as ev} from "enum-values";
import * as React from "react";
import {Break, Option, OptionType} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export default class DemoOption extends React.Component<any, undefined> {
	constructor(props: any) {
		super(props);
		debug("creating");
	}

	@autobind
	private handleClick(val: boolean, text: string) {
		debug("clicked option, flag: %o, text: %o", val, text);
	}

	private buildOptions() {
		const options: any[] = [];

		for (const key of ev.getNames(OptionType)) {
			options.push(
				<div className='option-display-group'>
					<Option
						disabled={this.props["disabled"]}
						onClick={this.handleClick}
						sizing={this.props["sizing"]}
						optionType={OptionType[key]}
					/>
					<Option
						disabled={this.props["disabled"]}
						initialToggle={true}
						onClick={this.handleClick}
						optionType={OptionType[key]}
						sizing={this.props["sizing"]}
						text={key}
					/>
					<Break sizing={this.props["sizing"]} />
				</div>
			);
		}

		return options;
	}

	public render() {
		return (
			<StyledContainer id='optionExample' title='Option'>
				{this.buildOptions()}
			</StyledContainer>
		);
	}
}
