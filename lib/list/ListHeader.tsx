// TODO: add documenation for ListHeader

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent, Sizing} from '../shared';

export interface ListHeaderProps extends ItemProps {
	href?: any;
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			href: {
				sizing: Sizing.normal
			}
		}));
}

export class ListHeader extends BaseComponent<ListHeaderProps, undefined> {

	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();

	constructor(props: ListHeaderProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: ListHeaderProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-list-header');
		this.classes.push(this.styles.listHeader);
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
