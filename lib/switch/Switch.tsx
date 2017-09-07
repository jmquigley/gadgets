// TODO: add Switch implementation
// TODO: add Switch documentation

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';

export interface SwitchProps extends BaseProps {
	initialState: boolean;
}

export function getDefaultSwitchProps(): SwitchProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			initialState: false
		})
	);
}

export interface SwitchState {
	toggle: boolean;
}

export class Switch extends BaseComponent<SwitchProps, SwitchState> {

	public static defaultProps: SwitchProps = getDefaultSwitchProps();

	constructor(props: SwitchProps) {
		super(props, require('./styles.css'));

		this.state = {
			toggle: this.props.initialState
		};
	}

	public render() {
		return (
			<div />
		);
	}
}
