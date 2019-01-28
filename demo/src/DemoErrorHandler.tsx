'use strict';

const debug = require('debug')('DemoErrorHandler');

import autobind from 'autobind-decorator';
import * as React from 'react';
import {
	Button,
	Wrapper
} from '../../dist/bundle';
import {StyledContainer} from '../app';

export interface DemoErrorHandlerState {
	show?: boolean;
}

interface BuggyComponentProps {
	show?: boolean;
}

class BuggyComponent extends React.PureComponent<BuggyComponentProps, undefined> {

	constructor(props: BuggyComponentProps) {
		super(props);
	}

	public render() {
		if (this.props.show) {
			throw new Error('BuggyComponent error condition (fake)');
		}

		return(<p>Component is working<br/></p>);
	}
}

export default class DemoErrorHandler extends React.PureComponent<any, DemoErrorHandlerState> {

	constructor(props: any) {
		super(props);
		debug('creating');

		this.state = {
			show: false
		};
	}

	@autobind
	private handleShowError() {
		this.setState({show: !this.state.show});
	}

	@autobind
	private handlePrintError(error: string, errorInfo: any) {
		debug('error in DemoErrorHandler: %s, errorInfo: %O', error, errorInfo);
	}

	public render() {
		return(
			<StyledContainer id="errorExample" title="Error Handler">
				<Wrapper
					{...this.props}
					obj="DemoErrorHandler"
					onError={this.handlePrintError}
					reset={!this.state.show}
				>
					<BuggyComponent show={this.state.show} />
				</Wrapper>

				<div className="toastBox">
					<Button iconName="bomb" onClick={this.handleShowError} />
					<p>Click button to toggle error message</p>
				</div>
			</StyledContainer>
		);
	}
}
