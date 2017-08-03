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

	public componentWillUpdate(nextProps: TagListProps) {
		this.resetStyles(nextProps);
		this.classes.push('ui-taglist');
		this.classes.push(this.styles.tagList);
		this.buildStyles(nextProps);
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
			<div className={this.classes.join(' ')}>
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
