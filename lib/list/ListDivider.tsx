/**
 * Creats a dividing line within a List compoenent.  It uses a single `<hr />`
 * to within a list item to make the dividing line.
 *
 * #### Examples:
 *
 * ```javascript
 * import {List, ListDivider} from 'gadgets';
 * <List>
 *     <ListDivider backgroundColor="red" />
 * </List>
 * ```
 *
 * #### Events
 * None
 *
 * #### Styles
 * - `ui-list-divider` - A class style on the `<li>` tag (root) of the
 * component.
 *
 * #### Properties
 * - `color: string (inherit)` - The color of the dividing line
 *
 * @module ListDivider
 */

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, Wrapper} from '../shared';
import styled from '../shared/themed-components';
import {getDefaultListProps, getDefaultListState, ListProps, ListState} from './List';

export interface ListDividerProps extends ListProps {
	color?: string;
}

export type ListDividerState = ListState;

export function getDefaultListDividerProps(): ListDividerProps {
	return cloneDeep(Object.assign({},
		getDefaultListProps(), {
			color: 'lightgray',
			obj: 'ListDivider'
		})
	);
}

export const ListDividerView: any = styled.li`
	background-color: inherit;

	> hr {
		border: none;
		height: 1px;
		margin: 5px;
	}
`;

export class ListDivider extends BaseComponent<ListDividerProps, ListDividerState> {

	public static defaultProps: ListDividerProps = getDefaultListDividerProps();
	public state: ListState = getDefaultListState();

	constructor(props: ListDividerProps) {
		super(props, ListDivider.defaultProps.style);
	}

	public static getDerivedStateFromProps(props: ListDividerProps, state: ListDividerState) {
		state.classes.clear();
		state.classes.add('ui-list-divider');

		state.style['backgroundColor'] = props.color;

		return super.getDerivedStateFromProps(props, state);
	}

	public render() {
		return(
			<Wrapper {...this.props} >
				<ListDividerView className={this.state.classes.classnames}>
					<hr style={this.state.style} />
				</ListDividerView>
			</Wrapper>
		);
	}
}
