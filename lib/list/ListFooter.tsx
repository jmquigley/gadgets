/**
 * A special title block that can be placed at the bottom of a List
 *
 * #### Examples:
 *
 * ```javascript
 * import {List, ListFooter} from 'gadgets';
 * <List>
 *     <ListFooter title"footer string" />
 * </List>
 * ```
 *
 * #### Events
 * See `Title` component
 *
 * #### Styles
 * - `ui-list-footer` - A class style on the title block of the
 * component.
 *
 * #### Properties
 * See `Title` component
 *
 * @module ListFooter
 */

import * as React from "react";
import styled from "styled-components";
import {BaseComponent, Wrapper} from "../shared";
import {
	getDefaultTitleProps,
	getDefaultTitleState,
	Title,
	TitleLayout,
	TitleProps,
	TitleState
} from "../title";

export type ListFooterProps = TitleProps;

export function getDefaultListFooterProps(): TitleProps {
	return {
		...getDefaultTitleProps(),
		layout: TitleLayout.even,
		title: ""
	};
}

export type ListFooterState = TitleState;

export function getDefaultListFooterState(): ListFooterState {
	return {...getDefaultTitleState()};
}

const ListFooterView: any = styled(Title)`
	margin: -1px;
	padding: 3px;
	padding-left: 7px;

	input {
		padding: 2px;
	}
`;

export class ListFooter extends BaseComponent<
	ListFooterProps,
	ListFooterState
> {
	public static readonly defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super("ui-list-footer", ListFooter, props, getDefaultListFooterState());
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props}>
				<ListFooterView
					{...this.props}
					className={this.className}
					ripple={this.props.ripple}
					style={this.state.style}
					title={this.props.title}
				/>
			</Wrapper>
		);
	}
}

export default ListFooter;
