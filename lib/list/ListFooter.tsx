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
import {Title, TitleLayout, TitleProps, TitleState} from "../title/Title";

export type ListFooterProps = TitleProps;
export type ListFooterState = TitleState;

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
	public static readonly defaultProps: ListFooterProps = {
		...Title.defaultProps,
		layout: TitleLayout.even,
		title: ""
	};

	constructor(props: ListFooterProps) {
		super("ui-list-footer", ListFooter, props);
	}

	public render() {
		super.render();

		return (
			<Wrapper {...this.props} name={this.name}>
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
