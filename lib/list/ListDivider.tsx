/**
 * Creats a dividing line within a List compoenent.  It uses a single
 * `<hr />` to wihtin a list item to make the dividing line.
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
import {BaseComponent} from '../shared';

export interface ListDividerProps extends ItemProps {
}

export function getDefaultListDividerProps(): ListDividerProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			color: 'lightgray'
		}));
}

export interface ListDividerState {}

export class ListDivider extends BaseComponent<ListDividerProps, ListDividerState> {

	public static defaultProps: ListDividerProps = getDefaultListDividerProps();

	constructor(props: ListDividerProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	shouldComponentUpdate(nextProps: ListDividerProps) {
		super.resetStyles(nextProps);
		this.classes.push('ui-list-divider');
		this.classes.push(this.styles.listDivider);
		super.buildStyles(nextProps);
		return true;
	}

	render() {
		return(
			<li className={this.classes.join(' ')}>
				<hr	style={{backgroundColor: this.props.color}} />
			</li>
		);
	}
}
