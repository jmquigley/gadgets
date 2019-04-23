// TODO: add documenation for ListFooter

import * as React from "react";
import {BaseComponent, Wrapper} from "../shared";
import styled from "../shared/themed-components";
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
	return {...getDefaultTitleState("ui-list-footer")};
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
		super(props, ListFooter.defaultProps.style);
	}

	public render() {
		return (
			<Wrapper {...this.props}>
				<ListFooterView
					{...this.props}
					className={this.state.classes.classnames}
					noripple
					style={this.state.style}
					title={this.props.title}
				/>
			</Wrapper>
		);
	}
}

export default ListFooter;
