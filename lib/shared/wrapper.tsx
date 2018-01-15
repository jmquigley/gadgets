/**
 * This component surrounds (wraps) all other components in the library.  It
 * is used to catch potential errors within the control.  These are [error boundaries](https://reactjs.org/docs/error-boundaries.html)
 * that are new to React 16.  It also wraps the [ThemeProvider](https://www.styled-components.com/docs/api#themeprovider)
 * used by the [styled-components](https://reactjs.org/docs/error-boundaries.html).
 *
 * ## Screen:
 * #### Before
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/wrapper-before.png" width="50%" />
 *
 * #### After
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/wrapper-after.png" width="50%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Wrapper} from 'gadgets';
 * <Wrapper
 *     className="test-class"
 *     onError={(error, errorInfo) => {
 *         console.log(error, errorInfo);
 *     }
 *     reset
 * >
 *     <BuggyComponent />
 * </Wrapper>
 * ```
 *
 * In this example if the `<BuggyComponent>` throws an error, then this Wrapper
 * will catch the error and present a fallback component that prevents React
 * from crashing the rest of the app/components.
 *
 * ## API
 * #### Events
 * - `onError(error: any, errorInfo: any)` - When an error is captured by the
 * React `componentDidCatch` method and handled, this callback is also invoked
 * so that the user can respond outside of this control.
 *
 * #### Styles
 * - `ui-error` - The top level `<div>` control around the error block.
 * - `ui-error-message` - A `<span>` around the error message from the Error
 * thrown from the component.
 * - `ui-error-stack` -  A `<details>` block that contains the stack trace of
 * the thrown Error.
 *
 * #### Properties
 * - `children: {React.ReactNode} (null)` - The underlying components that are
 * surrounded by this wrapper.
 * - `reset: {boolean} (false)` - After a component is wrapped, and an error is
 * thrown, the state of *error* will be permanent within the component.  Passing
 * reset as a prop to the wrapper allows the Error condition to be reset.  This
 * would be used if there is a facility in place within the component to
 * react/retry conditions that lead to fixed component.  Without this reset it
 * would be impossible to reset the internal state of the wrapper on retry.
 *
 * @module Wrapper
 */

'use strict';

// const debug = require('debug')('Wrapper');

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
			if (!this.props.disabled) {
				this.props.onError(msg, errorInfo);
			}
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
		if (this.state.errorInfo && !this.props.disabled) {
			return (
				<ThemeProvider theme={this.theme}>
					<WrapperView className={this.classes}>
						<span className="ui-error-message">Error in component '{this.props.obj}'</span>
						<details className="ui-error-stack" style={{ whiteSpace: 'pre-wrap' }}>
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
