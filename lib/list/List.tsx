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
	BaseState,
	getDefaultBaseProps,
	getDefaultBaseState,
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
	return cloneDeep({...getDefaultBaseProps(),
		alternating: false,
		children: null,
		noselect: false,
		obj: 'List',
		onSelect: nilEvent
	});
}

export interface ListState extends BaseState {
	keys: Keys;
	selectedItem: ListItem;
}

export function getDefaultListState(className: string = 'ui-list'): ListState {
	return cloneDeep({...getDefaultBaseState(className),
		keys: null,
		selectedItem: null
	});
}

export const ListView: any = styled.ul`
	border: solid 1px ${props => props.theme.borderColor};
	list-style: none;

	${(props: ListProps) => props.alternating &&
		'> li:nth-child(2n) {background: #e6e6e6;}'
	}
`;

export class List extends BaseComponent<ListProps, ListState> {

	public static defaultProps: ListProps = getDefaultListProps();
	public state: ListState = getDefaultListState();

	constructor(props: ListProps) {
		super(props, List.defaultProps.style);

		this.state = {...getDefaultListState(),
			keys: new Keys({testing: this.props.testing})
		};
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

	public static getDerivedStateFromProps(props: ListProps, state: ListState) {
		const newState: ListState = {...state};

		if (props.children) {
			newState.children = React.Children.map(props.children, (child: any, idx: number) => (
				React.cloneElement(child, {
					// only generate an id/key if one is not given with the props
					id: child['props']['id'] || newState.keys.at(idx),
					key: child['key'] || newState.keys.at(idx),
					sizing: props.sizing
				})
			));
		}

		return super.getDerivedStateFromProps(props, newState);
	}

	public render() {
		let children: any = null;
		const selectedKey = (this.state.selectedItem && this.state.selectedItem.props.id) || null;

		if (this.state.children) {
			children = React.Children.map(this.state.children, (child: any) => {
				const selected = child['props'].id === selectedKey;
				return React.cloneElement(child as any, {
					href: {
						selectHandler: this.selectHandler,
						sizing: this.props.sizing
					},
					selected: !this.props.noselect && selected
				});
			});
		}

		return (
			<Wrapper {...this.props} >
				<ListView
					alternating={this.props.alternating}
					className={this.state.classes.classnames}
					style={this.state.style}
				>
					{children}
				</ListView>
			</Wrapper>
		);
	}
}
