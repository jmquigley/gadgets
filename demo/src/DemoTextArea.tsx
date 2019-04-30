"use strict";

const debug = require("debug")("DemoTextArea");

import autobind from "autobind-decorator";
import * as React from "react";
import {getUUID} from "util.toolbox";
import {Break, Button, TextArea} from "../../dist/bundle";
import {StyledContainer} from "./helpers";

export interface DemoTextAreaState {
	value: string;
}

export default class DemoTextArea extends React.Component<
	any,
	DemoTextAreaState
> {
	constructor(props: any) {
		super(props);
		debug("creating");

		this.state = {
			value: "multi\nline\ntext"
		};
	}

	@autobind
	private handleUpdate(value: string) {
		debug(`handleUpdate(${value}`);
	}

	@autobind
	private handleClick() {
		this.setState({
			value: getUUID()
		});
	}

	public render() {
		return (
			<StyledContainer id='textareaExample' title='TextArea'>
				<TextArea
					disabled={this.props["disabled"]}
					onUpdate={this.handleUpdate}
					sizing={this.props["sizing"]}
					value={this.state.value}
				/>
				<Break n={2} />

				<div className='toastBox'>
					<Button onClick={this.handleClick} />
					<p>click button to generate random text</p>
				</div>
			</StyledContainer>
		);
	}
}
