// TODO: add documenation for ListHeader

//
// Generates a single header element that will be contained within a
// List.  This resolved to the `<li>` tag with special CSS selectors
// for a header.
//

// const debug = require("debug")("gadgets.ListHeader");

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
		nohover: true,
		obj: "ListHeader"
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
	public static defaultProps: ListHeaderProps = getDefaultListHeaderProps();
	public state: ListHeaderState = getDefaultItemState();

	constructor(props: ListHeaderProps) {
		super(props, "ui-list-header", ListHeader.defaultProps.style);
	}

	public render() {
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
