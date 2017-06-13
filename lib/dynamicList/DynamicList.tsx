'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';

export interface DynamicListProps extends BaseProps {
	title?: string;
}

export function getDefaultDynamicListProps(): DynamicListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			title: ""
		}));
}

export interface DynamicListState {
}

export class DynamicList extends BaseComponent<DynamicListProps, undefined> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	constructor(props: DynamicListProps) {
		super(props, require("./styles.css"));
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes.push("ui-dynamiclist");
	}

	render() {
		this.buildStyles();

		return (
			<div className={this.classes.join(" ")}>
			</div>
		);
	}
}
