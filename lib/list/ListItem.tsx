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
import {BaseComponent, getTheme, Sizing} from '../shared';
import {ThemeProvider} from '../shared/themed-components';

export interface ListItemProps extends ItemProps {
	href?: any;  // holds a function injected by the parent for selection
	onBlur?: any;
	onDoubleClick?: any;
	onClick?: any;
	onSelect?: any;
}

export function getDefaultListItemProps(): ListItemProps {
	return cloneDeep(Object.assign({},
		getDefaultItemProps(), {
			href: {
				selectHandler: nilEvent,
				sizing: Sizing.normal
			},
			obj: 'ListItem',
			onBlur: nilEvent,
			onClick: nilEvent,
			onDoubleClick: nilEvent,
			onSelect: nilEvent
		})
	);
}

export interface ListItemState {
	toggleRipple: boolean;  // use this to turn ripple on/off during editing
}

export class ListItem extends BaseComponent<ListItemProps, ListItemState> {

	public static defaultProps: ListItemProps = getDefaultListItemProps();
	private _delay = 250;  // double click delay
	private _preventClick: boolean = false;
	private _timer: any = null;

	constructor(props: ListItemProps) {
		super(props, ListItem.defaultProps.style);

		this._classes.add(['ui-listitem']);

		this.state = {
			toggleRipple: false
		};

		this.bindCallbacks(
			'handleBlur',
			'handleClick',
			'handleDoubleClick',
			'handleKeyDown',
			'handleKeyPress'
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
		this.setState(() => (
			{toggleRipple: false}
		));
	}

	private handleBlur(e: React.FocusEvent<HTMLLIElement>) {
		this.deactivateEdit();
		this.props.onBlur(e);
	}

	private handleClick(e: React.MouseEvent<HTMLLIElement>) {
		if (!this.props.disabled && this.props.visible) {
			// This timer will wait N seconds before respecting the single click
			// It is a way to differentiate between single and double click events
			// A double click is handled differently from the single
			this._timer = setTimeout(() => {
				if (!this._preventClick) {
					this.props.href.selectHandler(this);
					this.props.onClick(e);
					this.props.onSelect(this.props.title);
				}
			}, this._delay);
		}
	}

	private handleDoubleClick(e: React.MouseEvent<HTMLLIElement>) {
		// If a double click occurs, then sent a flag preventing the single click
		// from firing after its timer expires
		clearTimeout(this._timer);
		this._preventClick = true;
		this.setState({toggleRipple: true}, () => {
			this.props.onDoubleClick(e);
		});
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

	public render() {
		return (
			<ThemeProvider theme={getTheme()}>
				<Item
					{...this.props}
					className={this.classes}
					noripple={this.state.toggleRipple || this.props.noripple}
					onBlur={this.handleBlur}
					onClick={this.handleClick}
					onDoubleClick={this.handleDoubleClick}
					onKeyDown={this.handleKeyDown}
					onKeyPress={this.handleKeyPress}
					sizing={this.props.href.sizing}
					style={this.inlineStyles}
				/>
			</ThemeProvider>
		);
	}
}
