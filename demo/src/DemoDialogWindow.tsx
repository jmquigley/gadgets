'use strict';

const debug = require('debug')('DemoDialogWindow');

import autobind from 'autobind-decorator';
import * as React from 'react';

import {
	ButtonText,
	Container,
	DialogWindow
} from '../../';

export interface DemoDialogBoxState {
	dialogShow: boolean;
}

export default class DemoDilogBox extends React.Component<any, DemoDialogBoxState> {

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			dialogShow: false
		};
	}

	@autobind
	private handleShowDialog() {
		this.setState({dialogShow: true});
	}

	@autobind
	private handleCloseDialog() {
		this.setState({dialogShow: false});
	}

	public render() {
		return(
			<Container id="dialogWindowExample" title="Dialog Window">
				<div id="simple-buttons">
					<div className="box">
						<ButtonText
							noicon
							onClick={this.handleShowDialog}
							text="Show Dialog Window"
						/>
						<DialogWindow
							onClose={this.handleCloseDialog}
							show={this.state.dialogShow}
						>
							<span>Dialog Content</span>
						</DialogWindow>
					</div>

				</div>
			</Container>
		);
	}
}
