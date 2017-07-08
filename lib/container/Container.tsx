//
// This generic control is used to group others controls.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
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

export interface ContainerState {}

export class Container extends BaseComponent<ContainerProps, ContainerState> {

	public static defaultProps: ContainerProps = getDefaultContainerProps();

	constructor(props: ContainerProps) {
		super(props, require('./styles.css'));
	}

	render() {
		return (
			<section className={`ui-container ${this.styles.container}`} id={this.props.id}>
				{this.props.children}
			</section>
		);
	}
}
