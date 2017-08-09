/**
 * A generic control used to group other controls.  It creates a
 * section tag around the given child component.
 *
 * #### Examples:
 *
 * ```javascript
 * import {Container} from 'gadgets';
 * <Container>
 *     ...
 * </Container>
 * ```
 *
 * #### Events
 * N/A
 *
 * #### Styles
 * - `ui-container` - placed on the root `<section>` tag
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
import {ClassNames} from 'util.classnames';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export interface ContainerProps extends BaseProps {
	children?: React.ReactNode;
}

export function getDefaultContainerProps(): ContainerProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		children: null
	}));
}

export class Container extends BaseComponent<ContainerProps, undefined> {

	public static defaultProps: ContainerProps = getDefaultContainerProps();

	private _rootCN: ClassNames;

	constructor(props: ContainerProps) {
		super(props, require('./styles.css'));

		this._rootCN = new ClassNames([
			'ui-container',
			this.styles.container
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: any) {
		this.buildCommonStyles(this._rootCN, nextProps);
	}

	public render() {
		return (
			<section
				className={this._rootCN.classnames}
				id={this.props.id}
			>
				{this.props.children}
			</section>
		);
	}
}
