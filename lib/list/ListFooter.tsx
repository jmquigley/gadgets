// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {ThemeProvider} from 'styled-components';
import {BaseComponent, getTheme} from '../shared';
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

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props, require('./styles.css'));

		this._classes.add([
			'ui-list-footer',
			this.styles.listFooter
		]);

		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<Title
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
