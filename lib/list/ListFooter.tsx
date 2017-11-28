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
			obj: 'ListFooter',
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
		super(props, ListFooter.defaultProps.style);

		this._classes.add('ui-list-header');
		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<ListFooterView
					{...this.props}
					className={this.classes}
					noripple
					style={this.inlineStyles}
					title={this.props.title}
				/>
			</ThemeProvider>
		);
	}
}
