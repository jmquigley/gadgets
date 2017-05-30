//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import * as React from 'react';
import {nil} from 'util.toolbox';
import {getDefaultItemProps, ItemComponent, ItemProps} from '../shared/item';

const styles = require('./styles.css');

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
}

export interface ListItemState {
}

export class ListItem extends React.Component<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = Object.assign(
		getDefaultItemProps(), {
			href: nil
		});

	constructor(props: ListItemProps) {
		super(props);
	}

	private buildClasses = () => {
		let l: string[] = Array.from(this.props.classes);

		if (this.props.className !== '') {
			l.push(this.props.className);
		}
		l.push(styles.listItem);
		l.push('ui-listitem');

		if (!this.props.visible) {
			l.push(styles.invisible);
		}

		if (this.props.disabled) {
			l.push(styles.disabled);
			l.push('nohover');
		}

		return l;
	}

	private handleClick = () => {
		this.props.href(this);
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
