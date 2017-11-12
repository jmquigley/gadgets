// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent, getTheme} from '../shared';
import styled, {ThemeProvider} from '../shared/themed-components';
import {
	getDefaultTitleProps,
	Title,
	TitleLayout,
	TitleProps
} from '../title';

export type ListFooterProps = TitleProps;

export function getDefaultListFooterProps(): TitleProps {
	return cloneDeep(Object.assign({},
		getDefaultTitleProps(), {
			layout: TitleLayout.even,
			title: ''
		})
	);
}

export const ListFooterView: any = styled(Title)`
	margin: -1px;
	padding: 3px;

	input {
		padding: 2px;
	}
`;

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props, {}, ListFooter.defaultProps.style);
		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<ListFooterView
					{...this.props}
					className="ui-list-footer"
					noripple
					style={this.inlineStyles}
					title={this.props.title}
				/>
			</ThemeProvider>
		);
	}
}
