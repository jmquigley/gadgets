// TODO: add documentation for ListItem

//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent, Sizing} from '../shared';

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
	onClick?: any;
	onSelect?: any;
}

export function getDefaultListItemProps(): ListItemProps {
	return cloneDeep(Object.assign(
		getDefaultItemProps(), {
			href: {
				selectHandler: nilEvent,
				sizing: Sizing.normal
			},
			onClick: nilEvent,
			onSelect: nilEvent
		}));
}

export interface ListItemState {
	toggleRipple: boolean;  // use this to turn ripple on/off during editing
}

export class ListItem extends BaseComponent<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = getDefaultListItemProps();
	private _delay = 300;
	private _preventClick: boolean = false;
	private _timer: any = null;

	constructor(props: ListItemProps) {
		super(props, require('./styles.css'));
		this.state = {
			toggleRipple: false
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);

		this.shouldComponentUpdate(props);
	}

	get preventClick(): boolean {
		return this._preventClick;
	}

	/**
	 * When an edit is concluded, this function is called to restore the pre-edit
	 * state.
	 */
	private deactivateEdit() {
		this._preventClick = false;
		this.setState({toggleRipple: false});
	}

	private handleBlur() {
		this.deactivateEdit();
	}

	private handleClick() {
		// This timer will wait N seconds before respecting the single click
		// It is a way to differentiate between single and double click events
		// A double click is handled differently from the single
		this._timer = setTimeout(() => {
			if (!this._preventClick) {
				this.props.href.selectHandler(this);
				this.props.onClick();
				this.props.onSelect(this.props.title);
			}
		}, this._delay);
	}

	private handleDoubleClick() {
		// If a double click occurs, then sent a flag preventing the single click
		// from firing after its timer expires
		clearTimeout(this._timer);
		this._preventClick = true;
		this.setState({toggleRipple: true});
	}

	private handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			this.deactivateEdit();
		}
	}

	private handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.deactivateEdit();
		}
	}

	private handleMouseOut() {
		this.deactivateEdit();
	}

	public shouldComponentUpdate(nextProps: ListItemProps): boolean {
		super.resetStyles(nextProps);
		this.classes.push('ui-listitem');
		this.classes.push(this.styles.listItem);
		super.buildStyles(nextProps);
		return true;
	}

	public render() {
		return (
			<Item
				{...this.props}
				className={this.classes.join(' ')}
				noripple={this.state.toggleRipple || this.props.noripple}
				onBlur={this.handleBlur}
				onClick={(!this.props.disabled && this.props.visible) ? this.handleClick : nilEvent}
				onDoubleClick={this.handleDoubleClick}
				onKeyDown={this.handleKeyDown}
				onKeyPress={this.handleKeyPress}
				onMouseOut={this.handleMouseOut}
				sizing={this.props.href.sizing}
				style={this.inlineStyle}
			/>
		);
	}
}
