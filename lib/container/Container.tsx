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
 *
 * @module Container
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	getTheme
} from '../shared';
import styled, {ThemeProvider, withProps} from '../shared/themed-components';

export interface ContainerProps extends BaseProps {
	children?: React.ReactNode;
}

export function getDefaultContainerProps(): ContainerProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			children: null,
			obj: 'Container'
		})
	);
}

export const ContainerView: any = withProps<ContainerProps, HTMLDivElement>(styled.div)`
	padding: 0;
	margin: 2px 1px 2px 1px;
`;

export class Container extends BaseComponent<ContainerProps, undefined> {

	public static defaultProps: ContainerProps = getDefaultContainerProps();

	constructor(props: ContainerProps) {
		super(props);
		this._classes.add(['ui-container']);
		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()} >
				<ContainerView
					className={this.classes}
					id={this.props.id}
					style={this.inlineStyles}
				>
					{this.props.children}
				</ContainerView>
			</ThemeProvider>
		);
	}
}
