/**
 * A special Item block that can be placed at the top of a List
 * Generates a single header element that will be contained within a
 * List.  This resolved to the `<li>` tag with special CSS selectors
 * for a header.
 *
 * #### Examples:
 *
 * ```javascript
 * import {List, ListHeader} from 'gadgets';
 * <List>
 *     <ListHeader title"header string" />
 * </List>
 * ```
 *
 * #### Events
 * See `Item` component
 *
 * #### Styles
 * - `ui-list-header` - A class style on the item block of the
 * component.
 *
 * #### Properties
 * See `Item` component
 *
 * @module ListFooter
 */

import * as React from "react";
import {
	getDefaultItemProps,
	getDefaultItemState,
	Item,
	ItemProps,
	ItemState
} from "../item";
import {BaseComponent, Wrapper} from "../shared";

export interface ListHeaderProps extends ItemProps {
	href?: any;
}

export function getDefaultListHeaderProps(): ListHeaderProps {
	return {
		...getDefaultItemProps(),
		nohover: true
	};
}

export type ListHeaderState = ItemState;

export function getDefaultListHeaderState(): ListHeaderState {
	return {...getDefaultItemState()};
}

export class ListHeader extends BaseComponent<
	ListHeaderProps,
	ListHeaderState
> {
	public static readonly defaultProps: ListHeaderProps = getDefaultListHeaderProps();

	constructor(props: ListHeaderProps) {
		super("ui-list-header", ListHeader, props, getDefaultItemState());
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props}>
				<Item
					{...this.props}
					className={this.className}
					sizing={this.props.sizing}
					style={this.state.style}
				/>
			</Wrapper>
		);
	}
}

export default ListHeader;
