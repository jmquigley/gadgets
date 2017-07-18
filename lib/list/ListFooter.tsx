// TODO: add documenation for ListFooter

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {BaseComponent} from '../shared';
import {Title, TitleLayout, TitleProps, getDefaultTitleProps} from '../title';

export interface ListFooterProps extends TitleProps {
	title?: string;
}

export function getDefaultListFooterProps(): TitleProps {
	return cloneDeep(Object.assign(
		getDefaultTitleProps(), {
			title: ''
		}));
}

export class ListFooter extends BaseComponent<ListFooterProps, undefined> {

	public static defaultProps: ListFooterProps = getDefaultListFooterProps();

	constructor(props: ListFooterProps) {
		super(props, require('./styles.css'));
		this.shouldComponentUpdate(props);
	}

	public shouldComponentUpdate(nextProps: ListFooterProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-list-footer');
		this.classes.push(this.styles.listFooter);
		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<Title
				{...this.props}
				className={this.classes.join(' ')}
				layout={TitleLayout.even}
				noripple
				style={this.inlineStyle}
			>
			{this.props.title}
			</Title>
		);
	}
}
