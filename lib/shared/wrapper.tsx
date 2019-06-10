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
 * - `children=null {React.ReactNode}` - The underlying components that are
 * surrounded by this wrapper.
 * - `err=null {any}` - A custom react component that can be used as the
 * error output.  This is used to override the default error output.
 * - `name="Unknown" {string}` - the name of the component where this Wrapper
 * object is used.
 * - `reset=false {boolean}` - After a component is wrapped, and an error is
 * thrown, the state of *error* will be permanent within the component.  Passing
 * reset as a prop to the wrapper allows the Error condition to be reset.  This
 * would be used if there is a facility in place within the component to
 * react/retry conditions that lead to fixed component.  Without this reset it
 * would be impossible to reset the internal state of the wrapper on retry.
 *
 * @module Wrapper
 */

import * as React from "react";
import styled, {ThemeProvider} from "styled-components";
import {nilEvent} from "util.toolbox";
import {BaseComponent} from "./base";
import {BaseProps, disabled, getDefaultBaseProps, invisible} from "./props";
import {BaseState, getDefaultBaseState} from "./state";

export interface WrapperProps extends BaseProps {
	children?: React.ReactChild;
	name?: string;
	onError?: any;
	reset?: boolean;
}

export function getDefaultWrapperProps(): WrapperProps {
	return {
		...getDefaultBaseProps(),
		children: null,
		name: "Unknown",
		onError: nilEvent,
		reset: false,
		style: {
			whiteSpace: "pre-wrap"
		}
	};
}

export interface WrapperState extends BaseState {
	error: string;
	errorInfo: any;
}

export function getDefaultWrapperState(): WrapperState {
	return {
		...getDefaultBaseState(),
		error: "",
		errorInfo: null
	};
}

const WrapperView: any = styled.div`
	${(props: WrapperProps) => disabled(props)}
	${(props: WrapperProps) => invisible(props)}
`;

export class Wrapper extends BaseComponent<WrapperProps, WrapperState> {
	public static defaultProps: WrapperProps = getDefaultWrapperProps();

	constructor(props: WrapperProps) {
		super("ui-error", Wrapper, props, getDefaultWrapperState());
	}

	public componentDidCatch(error: any = null, errorInfo: any = null) {
		const msg = error ? error.toString() : "";

		this.setState(
			{
				error: msg,
				errorInfo
			},
			() => {
				if (!this.props.disabled) {
					this.props.onError(msg, errorInfo);
				}
			}
		);
	}

	public static getDerivedStateFromProps(
		props: WrapperProps,
		state: WrapperState
	) {
		if (props.reset) {
			const newState: WrapperState = {
				...state,
				error: "",
				errorInfo: null
			};

			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public render() {
		super.render();

		let content: any = null;

		if (this.state.errorInfo && !this.props.disabled) {
			let errobj: any = this.props.err;
			const errmsg = "Error in component: ${this.props.name}";

			if (errobj == null) {
				errobj = (
					<WrapperView className={this.className}>
						<span className='ui-error-message'>{errmsg}</span>
						<details
							className='ui-error-stack'
							style={this.state.style}
						>
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
				<ThemeProvider theme={this.props.theme}>
					{content}
				</ThemeProvider>
			);
		}
	}
}
