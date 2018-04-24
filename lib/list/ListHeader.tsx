// TODO: add documenation for ListHeader

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {getDefaultItemProps, getDefaultItemState, Item, ItemProps, ItemState} from '../item';
import {BaseComponent, Wrapper} from '../shared';

export interface ListHeaderProps extends ItemProps {
	href?: any;
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return cloneDeep(Object.assign({},
		getDefaultItemProps(), {
			nohover: true,
			obj: 'ListHeader'
		})
	);
}

export type ListHeaderState = ItemState;

export class ListHeader extends BaseComponent<ListHeaderProps, ListHeaderState> {

	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();
	public state: ListHeaderState = getDefaultItemState();

	constructor(props: ListHeaderProps) {
		super(props, ListHeader.defaultProps.style);
	}

	public static getDerivedStateFromProps(props: ListHeaderProps, state: ListHeaderState) {
		state.classes.clear();
		state.classes.add('ui-list-header');

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return (
			<Wrapper {...this.props} >
				<Item
					{...this.props}
					className={this.state.classes.classnames}
					sizing={this.state.sizing}
					style={this.state.style}
				/>
			</Wrapper>
		);
	}
}
