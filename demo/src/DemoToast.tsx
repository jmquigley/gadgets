'use strict';

const debug = require('debug')('DemoToast');

import autobind from 'autobind-decorator';
import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import {
	Button,
	Container,
	Toast,
	ToastLevel
} from '../../dist/bundle';

export interface DemoToastState {
	toastVisible1: boolean;
	toastVisible2: boolean;
	toastVisible3: boolean;
	toastVisible4: boolean;
	toastVisible5: boolean;
	toastVisible6: boolean;
}

export default class DemoToast extends React.Component<any, DemoToastState> {

	private randomText = loremIpsum({units: 'sentences', count: 2, random: null});

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			toastVisible1: true,
			toastVisible2: true,
			toastVisible3: true,
			toastVisible4: true,
			toastVisible5: true,
			toastVisible6: true
		};
	}

	@autobind
	private handleClick(it: number) {
		const self: any = this;
		return () => {
			switch (it) {
				case 1: self.setState({toastVisible1: true}); break;
				case 2: self.setState({toastVisible2: true}); break;
				case 3: self.setState({toastVisible3: true}); break;
				case 4: self.setState({toastVisible4: true}); break;
				case 5: self.setState({toastVisible5: true}); break;
				case 6: self.setState({toastVisible6: true}); break;
			}
		};
	}

	@autobind
	private handleClose(it: number) {
		const self: any = this;
		return () => {
			switch (it) {
				case 1: self.setState({toastVisible1: false}); break;
				case 2: self.setState({toastVisible2: false}); break;
				case 3: self.setState({toastVisible3: false}); break;
				case 4: self.setState({toastVisible4: false}); break;
				case 5: self.setState({toastVisible5: false}); break;
				case 6: self.setState({toastVisible6: false}); break;
			}
		};
	}

	public render() {
		return (
			<Container id="toastExample" title="Toast">
				<h3>Info message with decay</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(1)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						level={ToastLevel.info}
						show={this.state.toastVisible1}
						sizing={this.props['sizing']}
						onClose={this.handleClose(1)}
					>
						This is a sample info message
					</Toast>
				</div>

				<h3>Warning message with decay</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(2)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						level={ToastLevel.warning}
						show={this.state.toastVisible2}
						sizing={this.props['sizing']}
						onClose={this.handleClose(2)}
					>
						This is a sample warning message
					</Toast>
				</div>

				<h3>Error message with decay</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(3)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						level={ToastLevel.error}
						show={this.state.toastVisible3}
						sizing={this.props['sizing']}
						onClose={this.handleClose(3)}
					>
						This is a sample error message
					</Toast>
				</div>

				<h3>Info message with persistence</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(4)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						decay={false}
						level={ToastLevel.info}
						show={this.state.toastVisible4}
						sizing={this.props['sizing']}
						onClose={this.handleClose(4)}
					>
						This is a sample info message
					</Toast>
				</div>

				<h3>Error message with persistence on the bottom</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(5)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						decay={false}
						level={ToastLevel.error}
						onClose={this.handleClose(5)}
						show={this.state.toastVisible5}
						sizing={this.props['sizing']}
						usebottom
					>
						This is a sample error message on the bottom
					</Toast>
				</div>

				<h3>Custom message with persistence</h3>
				<div className="toastInfo">
					<p>{this.randomText}</p>

					<div className="toastBox">
						<Button iconName="power-off" onClick={this.handleClick(6)} />
						<p>Reset the Toast widget (show)</p>
					</div>

					<Toast
						decay={false}
						level={ToastLevel.custom}
						onClose={this.handleClose(6)}
						sizing={this.props['sizing']}
						style={{
							backgroundColor: '#7fbf3f',
							borderColor: '#3fbfbf',
							color: 'magenta'
						}}
						show={this.state.toastVisible6}
					>
						This is a sample custom message
					</Toast>
				</div>
			</Container>
		);
	}
}
