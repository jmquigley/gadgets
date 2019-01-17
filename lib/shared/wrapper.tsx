/**
 * This component surrounds (wraps) all other components in the library.  It
 * is used to catch potential errors within the control.  These are
 * [error boundaries](https://reactjs.org/docs/error-boundaries.html)
 * that are new to React 16.  It also wraps the
 * [ThemeProvider](https://www.styled-components.com/docs/api#themeprovider)
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
 * - `err: {any} (null)` - A custom react component that can be used as the
 * error output.  This is used to override the default error output.
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
import {BaseProps, disabled, getDefaultBaseProps, invisible} from './props';
import {BaseState, getDefaultBaseState} from './state';
import styled, {ThemeProvider} from './themed-components';

export interface WrapperProps extends BaseProps {
	children?: React.ReactChild;
	onError?: any;
	reset?: boolean;
}

export function getDefaultWrapperProps(): WrapperProps {
	return cloneDeep({...getDefaultBaseProps(),
		children: null,
		onError: nilEvent,
		reset: false
	});
}

export interface WrapperState extends BaseState {
	error: string;
	errorInfo: any;
}

export function getDefaultWrapperState(): WrapperState {
	return cloneDeep({...getDefaultBaseState('ui-error'),
		error: '',
		errorInfo: null
	});
}

export const WrapperView: any = styled.div`
	${(props: WrapperProps) => disabled(props)}
	${(props: WrapperProps) => invisible(props)}
`;

export class Wrapper extends BaseComponent<WrapperProps, WrapperState> {

	public static defaultProps: WrapperProps = getDefaultWrapperProps();
	public state: WrapperState = getDefaultWrapperState();

	constructor(props: WrapperProps) {
		super(props, Wrapper.defaultProps.style);
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

	public static getDerivedStateFromProps(props: WrapperProps, state: WrapperState) {
		const newState: WrapperState = {...state};

		if (props.reset) {
			newState.error = '';
			newState.errorInfo = null;
		}

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		let content: any = null;

		if (this.state.errorInfo && !this.props.disabled) {
			let errobj: any = this.props.err;
			if (errobj == null) {
				errobj = (
					<WrapperView className={this.state.classes.classnames}>
						<span className="ui-error-message">Error in component '{this.props.obj}'</span>
						<details className="ui-error-stack" style={{ whiteSpace: 'pre-wrap' }}>
							{this.state.error}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</WrapperView>
				);
			}

			content = errobj;
		} else {
			content = this.props.children;
		}

		if (this.props.notheme) {
			return content;
		} else {
			return (
				<ThemeProvider theme={this.theme}>
					{content}
				</ThemeProvider>
			);
		}
	}
}
