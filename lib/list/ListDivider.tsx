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
import {getDefaultItemProps, ItemProps} from '../item';
import {BaseComponent, getTheme} from '../shared';
import styled, {ThemeProvider} from '../shared/themed-components';

export interface ListDividerProps extends ItemProps {
	color?: string;
}

export function getDefaultListDividerProps(): ListDividerProps {
	return cloneDeep(Object.assign({},
		getDefaultItemProps(), {
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

export class ListDivider extends BaseComponent<ListDividerProps, undefined> {

	public static defaultProps: ListDividerProps = getDefaultListDividerProps();

	constructor(props: ListDividerProps) {
		super(props, ListDivider.defaultProps.style);

		this._classes.add(['ui-list-divider']);
		this.componentWillUpdate(this.props);
	}

	public render() {
		return(
			<ThemeProvider theme={getTheme()}>
				<ListDividerView className={this.classes}>
					<hr	style={{backgroundColor: this.props.color}} />
				</ListDividerView>
			</ThemeProvider>
		);
	}
}
