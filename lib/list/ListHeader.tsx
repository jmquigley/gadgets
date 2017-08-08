// TODO: add documenation for ListHeader

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {join} from 'util.toolbox';
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

	private _rootClasses: Set<string>;

	constructor(props: ListHeaderProps) {
		super(props, require('./styles.css'));

		this._rootClasses = new Set<string>([
			'ui-list-header',
			this.styles.listHeader
		]);

		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: ListHeaderProps) {
		this.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		return (
			<Item
				{...this.props}
				className={join(this._rootClasses, ' ')}
				sizing={this.props.href.sizing}
				style={this.inlineStyle}
			/>
		);
	}
}
