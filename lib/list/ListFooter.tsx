// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent} from '../shared';
import {getDefaultTitleProps, Title, TitleLayout, TitleProps} from '../title';

export type ListFooterProps = TitleProps;

export function getDefaultListFooterProps(): TitleProps {
	return cloneDeep(Object.assign({},
		getDefaultTitleProps(), {
			layout: TitleLayout.even,
			title: ''
		}));
}

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props);

		this._classes.add([
			'ui-list-footer'
		]);

		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<Title
				{...this.props}
				className={this.classes}
				noripple
				style={this.inlineStyles}
				title={this.props.title}
			/>
		);
	}
}
