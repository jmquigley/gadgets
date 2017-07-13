// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent, Sizing} from '../shared';

export interface ListFooterProps extends ItemProps {
	href?: any;
}

export function getDefaultListFooterProps(): ListFooterProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			href: {
				sizing: Sizing.normal
			}
		}));
}

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: ListFooterProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-list-footer');
		this.classes.push(this.styles.listFooter);
		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<Item
				{...this.props}
				className={this.classes.join(' ')}
				sizing={this.props.href.sizing}
				style={this.inlineStyle}
			/>
		);
	}
}
