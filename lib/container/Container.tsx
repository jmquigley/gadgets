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

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	BaseState,
	fontStyle,
	getDefaultBaseProps,
	getDefaultBaseState,
	Wrapper
} from '../shared';
import styled, {withProps} from '../shared/themed-components';

export interface ContainerProps extends BaseProps {
	children?: React.ReactNode;
	title?: string;
}

export function getDefaultContainerProps(): ContainerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null,
			obj: 'Container',
			title: ''
		})
	);
}

export type ContainerState = BaseState;
export const getDefaultContainerState = getDefaultBaseState;

export const ContainerView: any = withProps<ContainerProps, HTMLDivElement>(styled.div)`
	padding: 0;
	margin: 2px 0;

	${props => props.sizing && fontStyle[props.sizing]}
`;

export class Container extends BaseComponent<ContainerProps, ContainerState> {

	public static defaultProps: ContainerProps = getDefaultContainerProps();
	public state: ContainerState = getDefaultContainerState();

	constructor(props: ContainerProps) {
		super(props);
	}

	public static getDerivedStateFromProps(props: ContainerProps, state: ContainerState) {
		state.classes.clear();
		state.classes.add('ui-container');

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		let title: any = null;
		if (this.props.title) {
			title = (
				<h1 key={this.props.title}>
					{this.props.title}
				</h1>
			);
		}

		return (
			<Wrapper {...this.props} >
				<ContainerView
					className={this.state.classes.classnames}
					key={this.props.id}
					id={this.props.id}
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
