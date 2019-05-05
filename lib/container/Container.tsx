/**
 * A generic control used to group other controls.  It creates a
 * section tag around the given child component.
 *
 * ## Examples:
 *
 * ```javascript
 * import {Container} from 'gadgets';
 * <Container>
 *     ...
 * </Container>
 * ```
 *
 * ## API
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-container` - placed on the root `<div>` tag
 *
 * #### Properties
 * - `children: React.ReactNode (null)` - The child components that exist
 * within the Container.
 * - `title: {string} ('')` - if a title is given, then an `<h1>` block is
 * created in front of the section with the given title.  By default there is
 * no title.
 *
 * @module Container
 */

// const debug = require("debug")("gadgets.Container");

import * as React from "react";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from "../shared";
import styled from "../shared/themed-components";

export interface ContainerProps extends BaseProps {
	children?: any;
	title?: string;
}

export function getDefaultContainerProps(): ContainerProps {
	return {
		...getDefaultBaseProps(),
		children: null,
		obj: "Container",
		title: ""
	};
}

export type ContainerState = BaseState;

export function getDefaultContainerState(): ContainerState {
	return {
		...getDefaultBaseState()
	};
}

const ContainerView: any = styled.div`
	height: ${(props: ContainerProps) => props.height};
	margin: 2px 0;
	minheight: ${(props: ContainerProps) => props.minHeight};
	padding: 0;

	${(props: ContainerProps) => props.sizing && fontStyle[props.sizing]}
`;

export class Container extends BaseComponent<ContainerProps, ContainerState> {
	public static defaultProps: ContainerProps = getDefaultContainerProps();
	public state: ContainerState = getDefaultContainerState();

	constructor(props: ContainerProps) {
		super(props, "ui-container", Container.defaultProps.style);
	}

	public render() {
		this.updateClassName();

		let title: any = null;
		if (this.props.title) {
			title = <h1 key={this.props.title}>{this.props.title}</h1>;
		}

		return (
			<Wrapper {...this.props}>
				<ContainerView
					className={this.className}
					key={this.props.id}
					height={this.props.height}
					id={this.props.id}
					minHeight={this.props.minHeight}
					sizing={this.props.sizing}
					style={this.state.style}
				>
					{title}
					{this.props.children}
				</ContainerView>
			</Wrapper>
		);
	}
}

export default Container;
