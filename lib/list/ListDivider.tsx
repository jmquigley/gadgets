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

import * as React from "react";
import styled from "styled-components";
import {BaseComponent, Wrapper} from "../shared";
import {List, ListProps, ListState} from "./List";

export interface ListDividerProps extends ListProps {
	color?: string;
}

export type ListDividerState = ListState;

const ListDividerView: any = styled.li`
	background-color: inherit;

	> hr {
		border: none;
		height: 1px;
		margin: 5px;
	}
`;

export class ListDivider extends BaseComponent<
	ListDividerProps,
	ListDividerState
> {
	public static readonly defaultProps: ListDividerProps = {
		...List.defaultProps,
		color: "lightgray"
	};

	constructor(props: ListDividerProps) {
		super("ui-list-divider", ListDivider, props);
	}

	public static getDerivedStateFromProps(
		props: ListDividerProps,
		state: ListDividerState
	) {
		if (props.color !== state.style.backgroundColor) {
			const newState: ListDividerState = {
				...state,
				style: {
					backgroundColor: props.color
				}
			};

			return super.getDerivedStateFromProps(props, newState, true);
		}

		return null;
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
				<ListDividerView className={this.className}>
					<hr style={this.state.style} />
				</ListDividerView>
			</Wrapper>
		);
	}
}

export default ListDivider;
