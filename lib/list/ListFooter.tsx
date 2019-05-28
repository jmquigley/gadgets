// TODO: add documenation for ListFooter

// const debug = require("debug")("gadgets.ListFooter");

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
		obj: "ListFooter",
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
	public static defaultProps: ListFooterProps = getDefaultListFooterProps();
	public state: ListFooterState = getDefaultListFooterState();

	constructor(props: ListFooterProps) {
		super(props, "ui-list-footer", ListFooter.defaultProps.style);
	}

	public render() {
		this.updateClassName();

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
