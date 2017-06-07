'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {baseClasses, BaseProps, getDefaultBaseProps} from '../shared';

// const styles = require('./styles.css');

export interface DynamicListProps extends BaseProps {
	title?: string;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			title: ''
		}));
}

export interface DynamicListState {
}

export class DynamicList extends React.Component<DynamicListProps, undefined> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	constructor(props: DynamicListProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props)
		return l;
	}

	render() {
		return (
			<div className={`ui-dynamiclist ${this.buildClasses().join(' ')}`}>
			</div>
		);
	}
}
