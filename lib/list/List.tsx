//
// This is a container element that holds the contents of a list.  It creates
// the `<ul>` tag that will hold all of the `<li>` tags.
//

'use strict';

import {cloneDeep} from 'lodash';
import * as React from 'react';
import {nilEvent} from 'util.toolbox';
import {BaseComponent, BaseProps, getDefaultBaseProps} from '../shared';
import {ListItem} from './index';

const styles = require('./styles.css');

export interface ListProps extends BaseProps {
	alternating?: boolean;
	onAdd?: any;
	unselect?: boolean;
}

export function getDefaultListProps(): ListProps {
	return cloneDeep(Object.assign(
		getDefaultBaseProps(), {
			alternating: false,
			onAdd: nilEvent,
			unselect: false
		})
	);
}

export interface ListState {
	selectedItem: ListItem;
}

export class List extends BaseComponent<ListProps, ListState> {

	public static defaultProps: ListProps = getDefaultListProps();

	constructor(props: ListProps) {
		super(props);
		this.state = {
			selectedItem: null
		}
	}

	protected buildStyles() {
		super.buildStyles(this.props);

		this._classes += " ui-list";
		this._classes += ` ${styles.list}`;

		if (this.props.alternating) {
			this._classes += ` ${styles.listAlternating}`;
		}
	}

	private selectHandler = (item: ListItem) => {
		console.log(`Selected: ${item.props.id}`);
		if (this.state.selectedItem != null && item.props.id === this.state.selectedItem.props.id) {
			item = null;
		}

		this.setState({
			selectedItem: item
		});
	}

	render() {
		this.buildStyles();

		let selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		let children = React.Children.map(this.props.children, child => {
			let selected = child['props'].id === selectedKey;
			return React.cloneElement(child as any, {
				href: {
					selectHandler: this.selectHandler
				},
				selected: (this.props.unselect) ? false : selected
			});
		});

		return (
			<div
				disabled={this.props.disabled}
				className={this._classes}
				style={this._style}
				id={this.props.id}>
				<ul>
					{children}
				</ul>
			</div>
		);
	}
}
