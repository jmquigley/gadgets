//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nil} from 'util.toolbox';
import {baseClasses, getDefaultItemProps, ItemComponent, ItemProps} from '../shared';

const styles = require('./styles.css');

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
}

export function getDefaultListItemProps(): ListItemProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			href: {
				selectHandler: nil
			}
		}));
}

export interface ListItemState {
}

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = getDefaultListItemProps();

	constructor(props: ListItemProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = baseClasses(this.props);

		l.push(styles.listItem);
		l.push('ui-listitem');

		return l;
	}

	private handleClick = () => {
		this.props.href.selectHandler(this);
		this.props.onClick();
	}

	render() {
		return (
			<ItemComponent
				{...this.props}
				classes={this.buildClasses()}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
			/>
		);
	}
}
