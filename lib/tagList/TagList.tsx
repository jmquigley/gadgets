// TODO: add documentation for TagList

'use strict';

import {cloneDeep, isEqual} from 'lodash';
import * as React from 'react';
import {Icon} from '../icon';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps
} from '../shared';
import {TextField} from '../textField';
import {Tag} from './Tag';

export interface TagListProps extends BaseProps {
	tags?: string[];
}

export function getDefaultTagListProps(): TagListProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		tags: []
	}));
}

export interface TagListState {
	tags?: string[];
}

export class TagList extends BaseComponent<TagListProps, TagListState> {

	public static readonly defaultProps: TagListProps = getDefaultTagListProps();

	constructor(props: TagListProps) {
		super(props, require('./styles.css'));

		this._rootStyles.add([
			'ui-taglist',
			this.styles.tagList
		]);

		this.state = {
			tags: props.tags
		};

		this.componentWillUpdate(props);
	}

	public componentWillReceiveProps(nextProps: TagListProps) {
		if (!isEqual(nextProps.tags, this.state.tags)) {
			this.setState({tags: nextProps.tags});
		}
	}

	public render() {

		const tags = [];
		if (this.state.tags.length > 0) {
			for (const tag of this.state.tags) {
				tags.push(
					<Tag key={tag}>{tag}</Tag>
				);
			}
		}

		return (
			<div className={this._rootStyles.classnames}>
				<Icon iconName="tags" />
				{tags}
				<TextField
					className={this.styles.tagListInput}
					placeholder="new"
				/>
			</div>
		);
	}
}
