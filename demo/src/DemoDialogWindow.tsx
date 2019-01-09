'use strict';

const debug = require('debug')('DemoDialogWindow');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	ButtonText,
	Container,
	DialogWindow
} from '../../dist/bundle';

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
		debug('Showing DialogWindow');
	}

	@autobind
	private handleCloseDialog() {
		this.setState({dialogShow: false});
		debug('Closing DialogWindow');
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
							height="600px"
							icon="plane"
							onClose={this.handleCloseDialog}
							show={this.state.dialogShow}
							title="Demo Dialog Window"
							width="600px"
						>
							<span>Dialog Content</span>
						</DialogWindow>
					</div>

				</div>
			</Container>
		);
	}
}
