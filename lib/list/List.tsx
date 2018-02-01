/**
 * This is a container element that holds the contents of a list.  It creates
 * the `<ul>` tag that will hold all of the `<li>` tags.  The user can
 * then select an item from the list and it will remain highlighted.  Each
 * item within the list has a title block and a possible left and right
 * widget control (for buttons, icons, etc).
 *
 * ## Screen:
 * <img src="https://github.com/jmquigley/gadgets/blob/master/images/list.png" width="40%" />
 *
 * ## Examples:
 *
 * ```javascript
 * import {Button, Icon, List, ListItem, ListHeader} from 'gadgets';
 *
 * ...
 * <List alternating sizing={this.props['sizing']}>
 *     <ListHeader
 *         leftButton={<Button iconName="plus" />}
 *         noedit
 *         rightButton={<Button iconName="plus" />}
 *         title={`Demo List Header (${this.props['sizing']})`}
 *     />
 *     <ListItem
 *         leftButton={<Button iconName="podcast"/>}
 *         rightButton={<Button iconName="paper-plane-o"/>}
 *         title="List Item 1"
 *         widget="12"
 *     />
 *     <ListItem
 *         leftButton={<Icon iconName="bolt" />}
 *         rightButton={<Button />}
 *         title="List Item 2 (with icon)"
 *         widget="13"
 *     />
 * </List>
 * ```
 *
 * #### Events
 * - `onSelect(title: string)` - When the user selects an item from the list
 * this callback is invoked.  It is given the string title associated with
 * the item.
 *
 * #### Styles
 * - `ui-list` - A class selector placed on the `<ul>` tag wrapper around the
 * list.
 *
 * #### Properties
 * - `alternating: {boolean} (false)` - Makes every other `<li>` entry within the
 * list grey to make viewing the list easier.  This is off by default.
 * - `noselect: {boolean} (false)` - If set to true then the item that has been
 * selected within the list will not be highlighted.  it's a way to turn of list
 * selection.
 *
 * @module List
 */

'use strict';

// const debug = require('debug')('List');

import autobind from 'autobind-decorator';
import {cloneDeep} from 'lodash';
import * as React from 'react';
import {Keys} from 'util.keys';
import {nilEvent} from 'util.toolbox';
import {
	BaseComponent,
	BaseProps,
	getDefaultBaseProps,
	Wrapper
} from '../shared';
import styled from '../shared/themed-components';
import {ListItem} from './index';

export interface ListProps extends BaseProps {
	alternating?: boolean;
	children?: React.ReactNode;
	noselect?: boolean;
	onSelect?: any;
}

export function getDefaultListProps(): ListProps {
	return cloneDeep(Object.assign({},
		getDefaultBaseProps(), {
			alternating: false,
			children: null,
			noselect: false,
			obj: 'List',
			onSelect: nilEvent
		})
	);
}

export interface ListState {
	selectedItem: ListItem;
}

export const ListView: any = styled.ul`
	border: solid 1px ${props => props.theme.borderColor};
	list-style: none;

	${(props: ListProps) => props.alternating &&
		'> li:nth-child(2n) {background: #e6e6e6;}'
	}
`;

export class List extends BaseComponent<ListProps, ListState> {

	private _children: any;
	private _keys: Keys;

	public static defaultProps: ListProps = getDefaultListProps();

	constructor(props: ListProps) {
		super(props, List.defaultProps.style);

		this._keys = new Keys({testing: this.props.testing});
		this._classes.add('ui-list');
		this._children = this.props.children;

		this.state = {
			selectedItem: null
		};

		this.componentWillReceiveProps(this.props);
		this.componentWillUpdate(this.props);
	}

	@autobind
	private selectHandler(item: ListItem) {
		if (this.state.selectedItem != null
			&& item.props.id === this.state.selectedItem.props.id) {
			item = null;
		}

		this.setState({
			selectedItem: item
		}, () => {
			if (item != null && 'props' in item) {
				this.props.onSelect(item['props'].title);
			}
		});
	}

	public componentWillReceiveProps(nextProps: ListProps) {
		if (nextProps.children) {
			this._children = React.Children.map(nextProps.children, (child: any, idx: number) => (
				React.cloneElement(child, {
					// only generate an id/key if one is not given with the props
					id: child['props']['id'] || this._keys.at(idx),
					key: child['key'] || this._keys.at(idx),
					sizing: nextProps.sizing
				})
			));
		}
	}

	public render() {
		const selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;
		const children: any = this._children.map((child: any) => {
			const selected = child['props'].id === selectedKey;
			return React.cloneElement(child as any, {
				selected: !this.props.noselect && selected,
				href: {
					selectHandler: this.selectHandler,
					sizing: this.props.sizing
				}
			});
		});

		return (
			<Wrapper {...this.props} >
				<ListView
					alternating={this.props.alternating}
					className={this.classes}
					style={this.inlineStyles}
				>
					{children}
				</ListView>
			</Wrapper>
		);
	}
}
