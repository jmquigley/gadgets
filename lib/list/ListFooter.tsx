// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent} from '../shared';
import {getDefaultTitleProps, Title, TitleLayout, TitleProps} from '../title';

export type ListFooterProps = TitleProps;

export function getDefaultListFooterProps(): TitleProps {
	return cloneDeep(Object.assign(
		getDefaultTitleProps(), {
			layout: TitleLayout.even,
			title: ''
		}));
}

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-list-footer',
			this.styles.listFooter
		]);

		this.componentWillUpdate(props);
	}

	public render() {
		return (
			<Title
				{...this.props}
				className={this._rootStyles.classnames}
				noripple
				style={this.inlineStyle}
				title={this.props.title}
			/>
		);
	}
}
