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
		this.componentWillUpdate(props);
	}

	public componentWillUpdate(nextProps: ListFooterProps) {
		super.resetStyles(nextProps);
		this.classes.push('ui-list-footer');
		this.classes.push(this.styles.listFooter);
		super.buildStyles(nextProps);
	}

	public render() {
		return (
			<Title
				{...this.props}
				className={this.classes.join(' ')}
				noripple
				style={this.inlineStyle}
				title={this.props.title}
			/>
		);
	}
}
