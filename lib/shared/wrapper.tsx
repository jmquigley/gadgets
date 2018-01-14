// TODO: Add errorhandler documentation

'use strict';

const debug = require('debug')('Wrapper');

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseComponent} from './base';
import {BaseProps, disabled, invisible} from './props';
import styled, {ThemeProvider, withProps} from './themed-components';

export interface WrapperProps extends BaseProps {
	children?: React.ReactNode;
	onError?: any;
	reset?: boolean;
}

export function getDefaultWrapperProps(): WrapperProps {
	return cloneDeep(Object.assign({}, {
			children: null,
			onError: nilEvent,
			reset: false
		})
	);
}

export interface WrapperState {
	error: string;
	errorInfo: any;
}

export const WrapperView: any = withProps<WrapperProps, HTMLDivElement>(styled.div)`
	${props => disabled(props)}
	${props => invisible(props)}
`;

export class Wrapper extends BaseComponent<WrapperProps, WrapperState> {

	public static defaultProps: WrapperProps = getDefaultWrapperProps();

	constructor(props: WrapperProps) {
		super(props, Wrapper.defaultProps.style);
		debug('Initializing error handler for %s', this.props.obj);

		this._classes.add('ui-error');
		this.state = {
			error: '',
			errorInfo: null
		};

		this.componentWillUpdate(props);
	}

	public componentDidCatch(error: any = null, errorInfo: any = null) {
		const msg = error ? error.toString() : '';
		this.setState({
			error: msg,
			errorInfo
		}, () => {
			this.props.onError(msg, errorInfo);
		});
	}

	public componentWillReceiveProps(nextProps: WrapperProps) {
		if (nextProps.reset) {
			this.setState({
				error: '',
				errorInfo: null
			});
		}
	}

	public render() {
		if (this.state.errorInfo) {
			return (
				<ThemeProvider theme={this.theme}>
					<WrapperView className={this.classes}>
						<span className="ui-error-message">Error in component '{this.props.obj}'</span>
						<details style={{ whiteSpace: 'pre-wrap' }}>
							{this.state.error}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</WrapperView>
				</ThemeProvider>
			);
		}

		return (
			<ThemeProvider theme={this.theme}>
				{this.props.children}
			</ThemeProvider>
		);
	}
}
