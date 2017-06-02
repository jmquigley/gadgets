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
	private _delay = 200;
	private _prevent: boolean = false;
	private _timer: any = null;

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
		// This timer will wait N seconds before respecting the single click
		// It is a way to differentiate between single and double click events
		// A double click is handled differently from the single
		this._timer = setTimeout(() => {
			if (!this._prevent) {
				this.props.href.selectHandler(this);
				this.props.onClick();
			}
			this._prevent = false;
		}, this._delay);
	}

	private handleDoubleClick = () => {
		// If a double click occurs, then sent a flag preventing the single click
		// from firing after its timer expires
		clearTimeout(this._timer);
		this._prevent = true;
	}

	render() {
		return (
			<ItemComponent
				{...this.props}
				classes={this.buildClasses()}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nil}
				onDoubleClick={this.handleDoubleClick}
			/>
		);
	}
}
