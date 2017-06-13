//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent} from '../shared';

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
}

export function getDefaultListItemProps(): ListItemProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			href: {
				selectHandler: nilEvent
			}
		}));
}

export interface ListItemState {
	toggleRipple: boolean;  // use this to turn ripple on/off during editing
}

export class ListItem extends BaseComponent<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = getDefaultListItemProps();
	private _delay = 300;
	private _prevent: boolean = false;
	private _timer: any = null;

	constructor(props: ListItemProps) {
		super(props, require('./styles.css'));
		this.state = {
			toggleRipple: false
		}
	}

	private deactivateEdit = () => {
		this._prevent = false;
		this.setState({toggleRipple: false});
	}

	private handleBlur = () => {
		this.deactivateEdit();
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
		}, this._delay);
	}

	private handleDoubleClick = () => {
		// If a double click occurs, then sent a flag preventing the single click
		// from firing after its timer expires
		clearTimeout(this._timer);
		this._prevent = true;
		this.setState({toggleRipple: true});
	}

	private handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.deactivateEdit();
		}
	}

	private handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			this.deactivateEdit();
		}
	}

	private handleMouseOut = () => {
		this.deactivateEdit();
	}

	protected buildStyles() {
		super.buildStyles(this.props);
		this.classes += " ui-listitem";
		this.classes += ` ${this.styles.listItem}`;
	}

	render() {
		this.buildStyles();

		return (
			<Item
				{...this.props}
				className={this.classes}
				noripple={this.state.toggleRipple || this.props.noripple}
				onBlur={this.handleBlur}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
				onDoubleClick={this.handleDoubleClick}
				onKeyDown={this.handleKeyDown}
				onKeyPress={this.handleKeyPress}
				onMouseOut={this.handleMouseOut}
				style={this.inlineStyle}
			/>
		);
	}
}
