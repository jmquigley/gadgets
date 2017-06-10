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

	private _classes: string = '';
	// private _style: any = null;

	constructor(props: DynamicListProps) {
		super(props);
	}

	private buildStyles = () => {
		this._classes = baseClasses(this.props)
		this._classes += " ui-dynamiclist";
	}

	render() {
		this.buildStyles();

		return (
			<div className={this._classes}>
			</div>
		);
	}
}
