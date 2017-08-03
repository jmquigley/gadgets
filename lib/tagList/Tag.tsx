// TODO: add documentation for Tag

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {ButtonCircle} from '../buttonCircle';
import {Label} from '../label';
import {
	BaseComponent,
	BaseProps,
	Color,
	getDefaultBaseProps
} from '../shared';

export interface TagProps extends BaseProps {
	onBlur?: any;
	onClick?: any;
	onFocus?: any;
}

export function getDefaultTagProps(): TagProps {
	return cloneDeep(Object.assign(getDefaultBaseProps(), {
		onClick: nilEvent,
		onMouseOut: nilEvent,
		onMouseOver: nilEvent
	}));
}

export interface TagState {
	showDelete?: boolean;
}

export class Tag extends BaseComponent<TagProps, TagState> {

	public static readonly defaultProps: TagProps = getDefaultTagProps();

	constructor(props: TagProps) {
		super(props, require('./styles.css'));

		this.state = {
			showDelete: false
		};

		this.bindCallbacks(
			'handleMouseOut',
			'handleMouseOver'
		);

		this.componentWillUpdate(props, this.state);
	}

	private handleMouseOut() {
		this.setState({showDelete: false});
	}

	private handleMouseOver() {
		this.setState({showDelete: true});
	}

	public componentWillUpdate(nextProps: TagProps, nextState: TagState) {
		this.resetStyles(nextProps);

		this.classes.push('ui-tag');
		this.classes.push(this.styles.tag);

		if (nextState.showDelete) {
			this.classes.push(this.styles.tagHover);
		} else {
			this.classes.push(this.styles.tagNoHover);
		}

		this.buildStyles(nextProps);
	}

	public render() {

		const text = React.Children.map(this.props.children, (child: any) => {
			return String(child);
		}).join(' ');

		return (
			<div
				className={this.classes.join(' ')}
				onMouseOut={this.handleMouseOut}
				onMouseOver={this.handleMouseOver}
			>
				<Label noedit text={text} />
				<ButtonCircle
					borderColor={Color.error}
					className={`${this.styles.tagDeleteButton} ${this.styles.middle}`}
					color={Color.error}
					iconName="times"
					onClick={this.props.onClick}
					sizing={this.prev().type}
					visible={this.state.showDelete}
				/>
			</div>
		);
	}
}
