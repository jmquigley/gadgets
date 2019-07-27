/**
 * This is a container element that holds the contents of a list.  It creates
 * the `<ul>` tag that will hold all of the `<li>` tags.  The user can
 * then select an item from the list and it will remain highlighted.  Each
 * item within the list has a title block and a possible left and right
 * widget control (for buttons, icons, etc).
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/list.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Button, Icon, List, ListItem, ListHeader} from 'gadgets';
 *
 * ...
 * <List alternating sizing={this.props['sizing']}>
 *     <ListHeader
 *         leftButton={<Button iconName="plus" />}
 *         noedit
 *         rightButton={<Button iconName="plus" />}
 *         title={`Demo List Header (${this.props['sizing']})`}
 *     />
 *     <ListItem
 *         leftButton={<Button iconName="podcast"/>}
 *         rightButton={<Button iconName="paper-plane-o"/>}
 *         title="List Item 1"
 *         widget="12"
 *     />
 *     <ListItem
 *         leftButton={<Icon iconName="bolt" />}
 *         rightButton={<Button />}
 *         title="List Item 2 (with icon)"
 *         widget="13"
 *     />
 * </List>
 * ```
 *
 * #### Events
 * - `onSelection(title: string)` - When the user selects an item from the list
 * this callback is invoked.  It is given the string title associated with
 * the item.
 *
 * #### Styles
 * - `ui-list` - A class selector placed on the `<ul>` tag wrapper around the
 * list.
 *
 * #### Properties
 * - `alternating=false {boolean}` - Makes every other `<li>` entry within the
 * list grey to make viewing the list easier.  This is off by default.
 * - `noselect=false {boolean}` - If set to true then the item that has been
 * selected within the list will not be highlighted.  it's a way to turn of list
 * selection.
 *
 * @module List
 */

import autobind from "autobind-decorator";
import * as React from "react";
import styled from "styled-components";
import {nilEvent} from "util.toolbox";
import {
	BaseComponent,
	BaseProps,
	BaseState,
	defaultBaseProps,
	Wrapper
} from "../shared";
import {ListItem} from "./ListItem";

export interface ListProps extends BaseProps {
	alternating?: boolean;
	children?: React.ReactNode;
	noselect?: boolean;
	onSelection?: (title: string) => void;
}

export interface ListState extends BaseState {
	selectedItem: ListItem;
}

const ListView: any = styled.ul`
	border: solid 1px ${(props) => props.theme.borderColor};
	list-style: none;

	${(props: ListProps) =>
		props.alternating &&
		"> li:nth-child(2n) {background: " +
			props.theme.itemAlternatingColor +
			";}"}

	.ui-item:hover {
		background-color: ${(props: ListProps) => props.theme.itemHoverColor};
	}
`;

export class List extends BaseComponent<ListProps, ListState> {
	public static readonly defaultProps: ListProps = {
		...defaultBaseProps,
		alternating: false,
		children: null,
		noselect: false,
		onSelection: nilEvent
	};

	constructor(props: ListProps) {
		super("ui-list", List, props, {
			selectedItem: null
		});
	}

	private buildChildList() {
		let children = null;

		if (this.props.children) {
			children = React.Children.map(
				this.props.children,
				(child: any, idx: number) => {
					const id = child["props"]["id"] || this.keys.at(idx);
					const selected: boolean =
						!this.props.noselect &&
						id != null &&
						this.state != null &&
						"selectedItem" in this.state &&
						this.state.selectedItem != null &&
						this.state.selectedItem.id === id;

					this.debug(
						"child: %O, id: %o, selected: %o, props: %O",
						child,
						id,
						selected,
						this.props
					);

					return React.cloneElement(child, {
						href: {
							selectHandler: this.selectHandler
						},
						id,
						key: id,
						selected,
						sizing: this.props.sizing
					});
				}
			);
		}

		return children;
	}

	@autobind
	private selectHandler(item: ListItem) {
		if (
			this.state.selectedItem != null &&
			item.props.id === this.state.selectedItem.props.id
		) {
			item = null;
		}

		this.debug("selectHandler -> item: %O", item);

		this.setState(
			{
				selectedItem: item
			},
			() => {
				if (item != null && "props" in item) {
					this.props.onSelection(item["props"].title);
				}
			}
		);
	}

	public render() {
		super.render();

		const children: any = this.buildChildList();
		this.debug("Children: %O", children);

		return (
			<Wrapper {...this.props} name={this.name}>
				<ListView
					alternating={this.props.alternating}
					className={this.className}
					style={this.state.style}
				>
					{children}
				</ListView>
			</Wrapper>
		);
	}
}

export default List;
