// TODO: add DynamicList documentation
// TODO: add DynamicList implementation

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
			title: ''
		}));
}

export class DynamicList extends BaseComponent<DynamicListProps, undefined> {

	public static defaultProps: DynamicListProps = getDefaultDynamicListProps();

	constructor(props: DynamicListProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: DynamicListProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-dynamiclist');
		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<div className={this.classes.join(' ')} />
		);
	}
}
