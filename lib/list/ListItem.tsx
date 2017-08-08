// TODO: add documentation for ListItem

//
// Generates elements that will be contained within a List.  This resolved
// to the `<li>` tag.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {join, nilEvent} from 'util.toolbox';
import {getDefaultItemProps, Item, ItemProps} from '../item';
import {BaseComponent, Sizing} from '../shared';

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
	onBlur?: any;
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
			onBlur: nilEvent,
			onClick: nilEvent,
			onSelect: nilEvent
		})
	);
}

export interface ListItemState {
	toggleRipple: boolean;  // use this to turn ripple on/off during editing
}

export class ListItem extends BaseComponent<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = getDefaultListItemProps();
	private _delay = 300;
	private _preventClick: boolean = false;
	private _rootClasses: Set<string>;
	private _timer: any = null;

	constructor(props: ListItemProps) {
		super(props, require('./styles.css'));

		this._rootClasses = new Set<string>([
			'ui-listitem',
			this.styles.listItem
		]);

		this.state = {
			toggleRipple: false
		};

		this.bindCallbacks(
			'handleBlur',
			'handleClick',
			'handleDoubleClick',
			'handleKeyDown',
			'handleKeyPress',
			'handleMouseOut'
		);

		this.componentWillUpdate(props);
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

	private handleBlur(e: React.FocusEvent<HTMLLIElement>) {
		this.deactivateEdit();
		this.props.onBlur(e);
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

	private handleKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
		if (e.key === 'Escape') {
			this.deactivateEdit();
		}

		this.props.onKeyDown(e);
	}

	private handleKeyPress(e: React.KeyboardEvent<HTMLLIElement>) {
		if (e.key === 'Enter') {
			this.deactivateEdit();
		}

		this.props.onKeyPress(e);
	}

	private handleMouseOut() {
		this.deactivateEdit();
	}

	public componentWillUpdate(nextProps: ListItemProps) {
		this.buildCommonStyles(this._rootClasses, nextProps);
	}

	public render() {
		return (
			<Item
				{...this.props}
				className={join(this._rootClasses, ' ')}
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
